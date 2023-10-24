import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref:"User"
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        default:false,
        ref:"Job"
    },
    status:{
        default:false,
        type:String
    }

},{
    timestamps:true
})


const Application = mongoose.model('Application',applicationSchema);
export default Application;