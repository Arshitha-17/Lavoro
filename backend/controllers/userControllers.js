import asyncHandler from 'express-async-handler'

const authUser = asyncHandler(async(req,res)=>{   
    res.status(200).json({message:"Auth user"})
});


// register 
// route POST /api/users
const registerUser= asyncHandler(async(req,res)=>{
    res.status(200).json({message:"Register User"})
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