import asyncHandler from 'express-async-handler'
import Hr from '../models/hrModel.js'
import generateToken from '../util/generateToken.js';
import { HrSendOtpEmail } from './SendEmail/HrSendOtpEmail.js'
import Job from '../models/jobModel.js';

const authHr = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const hr = await Hr.findOne({ email })
    if (hr && (await hr.matchPassword(password))) {
        generateToken(res, hr._id);
        res.status(201).json({
            _id: hr._id,
            name: hr.name,
            email: hr.email,
        })
    } else {
        res.status(401);
        throw new Error(`Invalid email or password`)
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


// Job Uploading

const jobAdding = asyncHandler(async (req, res) => {
    const { companyName, jobRole, experience, salary, jobType, jobLocation, lastDate, requirements } = req.body
    console.log(req.body);
    const job = await Job.create({
        companyName,
        jobRole,
        experience,
        salary,
        jobType,
        jobLocation,
        lastDate,
        requirements
    })
    return res.status(200).json({message:'Job Add Successfully'})
})


export {
    authHr,
    HRregister,
    HrForgotPassword,
    HrOtp,
    HrResetPassword,
    jobAdding
}