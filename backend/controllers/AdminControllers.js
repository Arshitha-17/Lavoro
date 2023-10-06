import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js'
import generateToken from '../util/generateToken.js';
import { AdminSendOtpEmail } from './AdminSendOtpEmail.js'


//  admin/auth
const authAdmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email })
    if (admin && (await admin.matchPassword(password))) {
        generateToken(res, admin._id);
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
        })
    } else {
        res.status(401);
        throw new Error(`Invalid email or password`)
    }
});


// admin/forgot
const AdminForgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) {
        return res.status(404).json({ message: 'Email not Found' })
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    admin.otp = otp;

    await admin.save();
    const emailSent = await AdminSendOtpEmail(admin.email, otp)
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



export{
    authAdmin,
    AdminForgotPassword
}