import mongoose from "mongoose";

const savedJobSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref:"User"
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Job"
    }

},{
    timestamps:true
})


const SavedJobs = mongoose.model('savedJob',savedJobSchema);
export default SavedJobs;