import mongoose from "mongoose";

const jobSchema = mongoose.Schema({

    companyName: {
        type: String,
        required: true,
        
    },
    jobRole : {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    Salary: {
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
        type: date,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },


}, {
    timestamps: true
})



const Job = mongoose.model('Job', jobSchema);
export default Job;