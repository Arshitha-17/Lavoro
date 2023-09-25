import asyncHandler from 'express-async-handler'
import User from '../../models/userModel.js';

const authUser = asyncHandler(async(req,res)=>{   
    res.status(200).json({message:"Auth user"})
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

// logout user
// route POST api/users/logout
const logoutUser = asyncHandler(async(req,res)=>{
    res.status(200).json({message:"Logout User"})
})

//  user progile
// route GET api/users/profile
const userProfile = asyncHandler(async(req,res)=>{
    res.status(200).json({message:" User Profile"})
})

//  user progile
// route PUT api/users/profile
const updateUserProfile = asyncHandler(async(req,res)=>{
    res.status(200).json({message:" Update User Profile"})
})


export {
    authUser,
    registerUser,
    logoutUser,
    userProfile,
    updateUserProfile
}