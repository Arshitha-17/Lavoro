import asynHandler from "express-async-handler";

import ChatMessage from "../models/chatMessage.js"
import ChatRoom from "../models/chatRoom.js";


const chatController = {
    createRoom: asynHandler(async (req, res) => {
        try {
            console.log("inside Create room");
            const { user, hr } = req.params
            console.log(req.params.user);
            let chatRoom = await ChatRoom.findOne({
                user: user,
                hr, hr
            })

            if (!chatRoom) {
                chatRoom = new ChatRoom({
                    user: user,
                    hr: hr,
                    messages: []
                })
                await chatRoom.save()
            }

            const roomDetails = await ChatRoom.findOne({ _id: chatRoom._id })
                .populate({ path: "hr", select: "name _id companyName" });
            console.log(roomDetails);
            res.status(200).json({ roomDetails })

        } catch (error) {
            console.error(error)
        }
    }),


    // chat send
    chatSend: asynHandler(async (req, res) => {
        try {
            const { content } = req.body
            const { chatId, sender, type } = req.params

            // new Chat start
            const newMessage = new ChatMessage({
                room: chatId,
                sender: sender,
                senderType: type,
                content: content,
            })
            await newMessage.save()

            const chatRoom = await ChatRoom.findOne({ _id: chatId })

            if (chatRoom) {
                chatRoom.messages.push(newMessage._id)
            }
            await chatRoom.save()
            console.log(newMessage);

            // Populate the sender field with specific fields (_id, name, email)
            // and also populate the nested fields room.user and room.seller
            await newMessage.populate([
                { path: "sender", select: "_id name email" },
                {
                    path: "room",
                    populate: [
                        { path: "user", select: "_id name email" },
                        { path: "hr", select: "_id name email companyName" }
                    ],
                },
            ]);
            res.status(200).json({ newMessage })
            console.log(newMessage);

        } catch (error) {
            console.error(error)
        }

    }),

    //  user side 

    getRoom: asynHandler(async (req, res) => {

        const { user } = req.params

        const rooms = await ChatRoom.find({ user: user }).populate({
            path: "hr", select: "_id name email companyName"
        })
        if (rooms) {
            res.status(200).json({ rooms })
        } else {
            res.status(400).json({ message: "failed to fetch room details" })
        }

    }),

    // hr get room

    getHrRoom: asynHandler(async (req, res) => {
        const { hr } = req.params;
        const rooms = await ChatRoom.find({ hr: hr }).populate({
            path: "user", select: "_id name email"
        })
        if (rooms) {
            res.status(200).json({ rooms })
        } else {
            res.status(400).json({ message: "Failed To Fetch Room Details" })
        }
    }),


    // get message

    getMessage: asynHandler(async (req, res) => {
        console.log("Inside room messages");
        console.log(req.params.roomid);
        const { roomid } = req.params
        try {
            const message = await ChatMessage.find({ room: roomid }).sort({ createdAt: 1 })
            console.log(message);
            if (message) {
                res.status(200).json({ message })
            } else {
                res.status(400).json({ message: "No message found for the given room" })
            }

        } catch (error) {
            console.log(error);
        }
    })

}


export default chatController;
