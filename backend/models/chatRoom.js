import mongoose from "mongoose";

const chatRoom = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User"
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hr"
    },
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ChatMessage"
    }]
})

const ChatRoom = mongoose.model("chatRoom",chatRoom);

export default ChatRoom;