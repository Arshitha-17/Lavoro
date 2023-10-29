import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../util/generateToken.js';
import { sendOtpEmail } from './SendEmail/sendOtpEmail.js'
import Job from '../models/jobModel.js'
import Category from '../models/category.js'
import Application from '../models/applicationModel.js';
import mongoose from 'mongoose';



const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "Invalid email or password" })
    }
    if (user.isBlock === true) {
        return res.status(500).json({ message: "You are Blocked" })
    }
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(401);
        throw new Error(`Invalid email or password`)
    }

});


// register 
// route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400);
        throw new Error(`User already exist`)
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,

        })
    } else {
        res.status(400);
        throw new Error(`Invalid User data`)
    }
})


// forgot password 
//  route POST 
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404).json({ message: 'User not Found' })
        return
    }

    // Generate a 6 digit OTP 
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save the OTP
    user.otp = otp;

    await user.save();

    const emailSent = await sendOtpEmail(user.email, otp)
    if (emailSent) {
        res.status(200).json({ otp });
    } else {
        res.status(500).json({ message: 'Failed to send email' })
    }

    // ----------------remove this and uncomment above code 
    // const emailSent = true
    // if (emailSent) {
    //     res.status(200).json({ message: 'OTP Send' });
    // } else {
    //     res.status(500).json({ message: 'Failed to send email' })
    // }
})


// otp verify
//  route POST  api/users/otp
const otpVerify = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email })

    if (user.otp !== otp) {

        return res.status(400).json({ message: 'Wrong OTP' });
    } else {

        return res.status(200).json({ user, message: 'OTP verified successfully' })
    }

})


// reset password user
// route POST api/users/resetPassword
const resetPassword = asyncHandler(async (req, res) => {
    const { email, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
        res.status(400).json({ message: 'Password and Confirm Password not match' })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update the user's password
        if (user) {
            user.password = password;
            const updateUser = await user.save();

            res.status(200).json({ message: "Password reset successfully" });
        }


    } catch (error) {
        res.status(500).json({ message: "Internal Server error" })
    }


})


// logout user
// route POST api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: "User Logout User" })
})


//  user profile
// route GET api/users/profile
const userProfile = asyncHandler(async (req, res) => {
    const userId = req.params.id
    const user = await User.findById({ _id: userId })
    res.status(200).json(user)
})




//  user progile
// route PUT api/users/profile

const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.qualification = req.body.qualification || user.qualification;
        user.experience = req.body.experience || user.experience;
        user.skills = req.body.skills || user.skills;
        user.bio = req.body.bio || user.bio;


        if (req.file) {
            const resumeFilePath = req.file.path;
            console.log("Uploaded Resume Path:", resumeFilePath);

            user.resume = req.file.filename;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            qualification: updatedUser.qualification,
            experience: updatedUser.experience,
            skills: updatedUser.skills,
            bio: updatedUser.bio,
            resume: updatedUser.resume,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


// category list
const categories = asyncHandler(async (req, res) => {
    const category = await Category.find({})
    res.status(200).json(category)
})
// Job list 


const getJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({})
    res.status(200).json({ jobs })
})

const jobList = asyncHandler(async (req, res) => {

    const userId = req.params.id;

    const applications = await Application.find({userId})
    const applicationJobIds = applications.map(application => application.jobId);
    // console.log(applicationJobIds);


    console.log("its me job");
    const jobs = await Job.find({ _id: { $nin: applicationJobIds } });

    console.log(jobs);


    res.status(200).json({ jobs })
})

// Job detail page
const jobDetailPage = asyncHandler(async (req, res) => {
    const jobId = req.params.id;
    const jobDetail = await Job.findById(jobId)
    res.status(200).json(jobDetail)
})

// job apply 
const sendApplication = asyncHandler(async (req, res) => {

    const { jobId, userId } = req.params;
    const { status } = req.body;

    const application = await Application.create({
        userId: userId,
        jobId: jobId,
        status: status,

    })
    res.status(200).json({ message: "Thank You For Your Application We Will Get Back You Soon ! 🥰" })

})


const checkApplicationStatus = asyncHandler(async (req, res) => {
    const { jobId, userId } = req.params;
    const application = await Application.findOne({ userId, jobId });
    res.status(200).json({ applied: !!application });
});




// aggregate application list user side
const aggregateFunction = async (userId_passed) => {
    try {
        const result = await Application.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails",
                },
            }, {
                $unwind: "$userDetails"
            },
            {
                $lookup: {
                    from: "jobs",
                    localField: "jobId",
                    foreignField: "_id",
                    as: "jobDetails"
                }
            },
            {
                $unwind: "$jobDetails"
            },
            {
                $match: {
                    'userDetails._id': new mongoose.Types.ObjectId(userId_passed)
                }
            },
        ])
        return result
    } catch (error) {
        console.error(error)
    }
}

// application list user side
const applicationList = asyncHandler(async (req, res) => {
    const userId = req.params.id

    const result = await aggregateFunction(userId)
    if (result) {
        return res.status(200).json({ result })
    } else {
        return res.status(401).json({ message: "Application not fount" })
    }

})


export {
    authUser,
    registerUser,
    forgotPassword,
    logoutUser,
    otpVerify,
    resetPassword,
    userProfile,
    updateUserProfile,
    jobList,
    categories,
    jobDetailPage,
    sendApplication,
    checkApplicationStatus,
    applicationList,
    getJobs

}