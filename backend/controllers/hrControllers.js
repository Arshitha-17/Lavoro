import asyncHandler from 'express-async-handler'
import Hr from '../models/hrModel.js'
import generateToken from '../util/generateToken.js';
import { HrSendOtpEmail } from './SendEmail/HrSendOtpEmail.js'
import Job from '../models/jobModel.js';
import Category from '../models/category.js'
import Application from '../models/applicationModel.js'

import mongoose from 'mongoose';

const authHr = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const hr = await Hr.findOne({ email });

    if (!hr) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    if (hr.isBlock === true) {
        return res.status(500).json({ message: "You Are Blocked" });
    }

    if (await hr.matchPassword(password)) {
        generateToken(res, hr._id);
        res.status(201).json({
            _id: hr._id,
            name: hr.name,
            email: hr.email,
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});


// hr register 
// route POST /api/hr/register
const HRregister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const HrExist = await Hr.findOne({ email })
    if (HrExist) {
        res.status(400);
        throw new Error(`Email already exist`)

    }
    const hr = await Hr.create({
        name,
        email,
        password
    })

    if (hr) {
        generateToken(res, hr._id);
        res.status(201).json({
            _id: hr._id,
            name: hr.name,
            email: hr.email,

        })
    } else {
        res.status(400);
        throw new Error(`Invalid User data`)
    }
})

// hr register 
// route POST /api/hr/forgot

const HrForgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    const hr = await Hr.findOne({ email })
    if (!hr) {
        return res.status(404).json({ message: 'Email not Found' })
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    hr.otp = otp;

    await hr.save();
    const emailSent = await HrSendOtpEmail(hr.email, otp)
    if (emailSent) {
        res.status(200).json({ message: 'OTP Send' });
    } else {
        res.status(500).json({ message: 'Failed to send email' })
    }

    // ----------------remove this and uncomment above code 
    // const emailSent = true
    // if(emailSent){
    //         res.status(200).json({ message:'OTP Send'});
    //     }else{
    //           res.status(500).json({message:'Failed to send email'})
    //         }
})



// otp verify
//  route POST  api/hr/otp
const HrOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const hr = await Hr.findOne({ email })

    if (hr.otp !== otp) {

        return res.status(400).json({ message: 'Wrong OTP' });
    } else {

        return res.status(200).json({ hr, message: 'OTP verified successfully' })
    }
})


const HrResetPassword = asyncHandler(async (req, res) => {
    const { email, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        res.status(400).json({ message: 'Password and Confirm Password not match' })
    }
    try {
        const hr = await Hr.findOne({ email })
        if (!hr) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update the user's password
        if (hr) {
            hr.password = password;
            const updateHr = await hr.save();

            res.status(200).json({ message: "Password reset successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" })
    }
})

const getCategories = asyncHandler(async (req, res) => {

    const jobCategory = await Category.find({ deleted: false })
    res.status(200).json(jobCategory)
})


// Job Uploading
const jobAdding = asyncHandler(async (req, res) => {

    const { companyName, jobRole, experience, salary, jobType, jobLocation, lastDate, requirements, jobDescription, qualification, hrId } = req.body
    console.log(req.body);
    const job = await Job.create({
        companyName,
        jobRole,
        experience,
        salary,
        jobType,
        jobLocation,
        lastDate,
        requirements,
        jobDescription,
        qualification,
        hrId
    })

    return res.status(200).json({ message: 'Job Add Successfully', job })
})

// list jobs
const jobList = asyncHandler(async (req, res) => {
    const jobs = await Job.find({})
    console.log(jobs)
    res.status(200).json(jobs)
})

// Job delete
const deleteJob = asyncHandler(async (req, res) => {
    console.log('inside delete');
    const { id } = req.params
    console.log(req.params);
    const jobs = await Job.findByIdAndDelete(id)
    res.status(200).json({ message: 'Delete Job successfully' })
})



//   hr profile
// route GET api/users/profile
const hrProfile = asyncHandler(async (req, res) => {
    const hrId = req.params.id
    const hr = await Hr.findById({ _id: hrId })
    console.log(hr);
    res.status(200).json(hr)
})




//  hr profile
// route PUT api/hr/profile

const updateHrProfile = asyncHandler(async (req, res) => {
    const hrId = req.params.id;
    const hr = await Hr.findById(hrId);

    if (hr) {
        hr.name = req.body.name || hr.name;
        hr.email = req.body.email || hr.email;
        hr.companyName = req.body.companyName || hr.companyName;
        hr.companyAddress = req.body.companyAddress || hr.companyAddress;
        hr.description = req.body.description || hr.description;
        const updatedHr = await hr.save();

        res.status(200).json({
            _id: updatedHr._id,
            name: updatedHr.name,
            email: updatedHr.email,
            companyName: updatedHr.companyName,
            companyAddress: updatedHr.companyAddress,
            description: updatedHr.description,
        });
    } else {
        res.status(404).json({ message: 'Hr not found' });
    }
});

// Aggregate application listing
const aggregateJobId = async (hr_id_passed) => {
    try {
        const result = await Application.aggregate([
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'jobDetails',
                },
            }, {
                $unwind: '$jobDetails'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails'
            },
            {
                $match: {
                    'jobDetails.hrId': new mongoose.Types.ObjectId(hr_id_passed)
                }
            },
        ]);
        return result;
    } catch (error) {
        console.error(error);
    }
};


// application listing
const applicationList = asyncHandler(async (req, res) => {
    const hrId = req.params.id
    const result = await aggregateJobId(hrId)
    if (result) {
        return res.status(200).json({ result })
    } else {
        return res.status(401).json({ message: "Application fetch error" })
    }

})

const acceptApplication = asyncHandler(async (req, res) => {
    const applicationId = req.params.id
    const application = await Application.findById(applicationId)
    application.status = "Application Accept"
    await application.save();
    return res.status(200).json({ message: "Application Accept" })

});


const rejectApplication = asyncHandler(async (req, res) => {
    const applicationId = req.params.id
    const application = await Application.findById(applicationId)
    application.status = "Application Rejected"
    const reject = await application.save();
  
    return res.status(200).json({ message: "Application Rejected" })

});

// getHrDetails

const getHrDetails = asyncHandler(async(req,res)=>{
    const hrId = req.params.id
    const hrDetails = await Hr.findOne({_id:hrId})
    res.status(200).json({hrDetails})
})


export {
    authHr,
    HRregister,
    HrForgotPassword,
    HrOtp,
    HrResetPassword,
    getCategories,
    jobAdding,
    jobList,
    deleteJob,
    hrProfile,
    updateHrProfile,
    applicationList,
    acceptApplication,
    rejectApplication,
    getHrDetails
}