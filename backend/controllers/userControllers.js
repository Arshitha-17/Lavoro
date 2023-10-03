import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../util/generateToken.js'; 
import {sendOtpEmail} from './sendOtpEmail.js'

const authUser = asyncHandler(async(req,res)=>{   
    const {email,password} = req.body;
    const  user = await User.findOne({email})
    
    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
           
        })
    }else{
        res.status(401);
        throw new Error(`Invalid email or password`)
    }

});


// register 
// route POST /api/users
const registerUser= asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400);
        throw new Error(`User already exist`)
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
           
        })
    }else{
        res.status(400);
        throw new Error(`Invalid User data`)
    }
})


// forgot password 
//  route POST 
const forgotPassword = asyncHandler(async(req,res)=>{
    const {email} =  req.body
    const  user = await User.findOne({email})
   if(!user){
    res.status(404).json({message:'User not Found'})
    return
   }

     // Generate a 6 digit OTP 
  const otp = Math.floor(100000 + Math.random() * 900000); 

  // Save the OTP
  user.otp = otp;

  await user.save();
  
  //   const emailSent = await sendOtpEmail(user.email,otp)
  //   if(emailSent){
      //       res.status(200).json({ otp });
      //   }else{
          //     res.status(500).json({message:'Failed to send email'})
          //   }
          
// ----------------remove this and uncomment above code 
    const emailSent = true
    if(emailSent){
            res.status(200).json({ message:'OTP Send'});
        }else{
              res.status(500).json({message:'Failed to send email'})
            }
})


// otp verify
//  route POST  api/users/otp
const otpVerify= asyncHandler(async(req,res)=>{
    const {email,otp} = req.body;

    const user = await User.findOne({email})

    if(user.otp!==otp){
        console.log('hey numma wrong aanntto');
        return res.status(400).json({ message: 'Wrong OTP' });
    }else{
        console.log('OTP success')
        return res.status(200).json({user,message:'OTP verified successfully'})
    }
    
})



// logout user
// route POST api/users/logout
const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    })

    res.status(200).json({message:"User Logout User"})
})


//  user profile
// route GET api/users/profile
const userProfile = asyncHandler(async(req,res)=>{
    const user ={
        _id : req.user._id,
        name: req.user.name,
        email:req.user.email
    }
    res.status(200).json(user)
})


//  user progile
// route PUT api/users/profile
const updateUserProfile = asyncHandler(async(req,res)=>{
    const user= await User.findById(req.user._id)

    if(user){
        user.name= req.body.name || user.name
        user.email= req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password;
        }

        const updateUser = await user.save();
     
        res.status(200).json({
            _id:updateUser._id,
            name:updateUser._name,
            email:updateUser.email
        })

    }else{
        res.status(404)
        throw new Error('User not found')
    }
})


export {
    authUser,
    registerUser,
    forgotPassword,
    logoutUser,
    otpVerify,
    userProfile,
    updateUserProfile
}