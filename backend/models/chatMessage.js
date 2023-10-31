import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema({
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chatRoom"
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:"senderType"
    },
    senderType:{
        type:String,
        enum:['User',"Hr"],
        required:true
    },
    content:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const ChatMessage = mongoose.model("ChatMessage",ChatMessageSchema)

export default ChatMessage;
