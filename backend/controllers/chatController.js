import asynHandler from "express-async-handler";

import ChatMessage from "../models/chatMessage.js"
import ChatRoom from "../models/chatRoom.js";


const chatController = {
     createRoom : asynHandler(async(req,res)=>{
        try {
            const {user,hr} =  req.params

            let chatRoom = await ChatRoom.findOne({
                user:user,
                hr,hr
            })

            if(!chatRoom){
                chatRoom = new ChatRoom ({
                    user:user,
                    hr:hr,
                    message:[]
                })
                await chatRoom.save()
            }

            const roomDetails = await ChatRoom.findOne({_id:chatRoom._id})
            .populate({path:"hr",selese:"name_id mobile"}).exec();
            let messageFiler = chatRoom.messages[chatRoom.messages.length - 1];
            const firstMessage = await ChatMessage.findOne(messageFiler);
            console.log(firstMessage);


        } catch (error) {
            console.error(error)
        }
    })
}


export default chatController;
