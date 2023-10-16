import mongoose from "mongoose";

const jobSchema = mongoose.Schema({

    companyName: {
        type: String,
        required: true,
    },
    jobRole : {
        type: String,
        ref: "Hr",
    },
    experience: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: false
    },
    jobType: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    lastDate: {
        type: Date,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    jobDescription:{
        type:String,
        required:false,
    },
    qualification:{
        type:String,
        required:false
    }


}, {
    timestamps: true
})



const Job = mongoose.model('Job', jobSchema);
export default Job;