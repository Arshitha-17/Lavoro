import express from "express"
import { authUser,
    registerUser,
    logoutUser,
    userProfile,
    updateUserProfile,
    forgotPassword,
    otpVerify,
    resetPassword
 } from "../controllers/userControllers.js"

const router = express.Router()
import { protect } from "../middleware/authMiddleware.js"

// router.post('/',home)
router.post('/register',registerUser)
router.post('/auth',authUser)
router.post('/forgot',forgotPassword)
router.post('/otp',otpVerify)
router.post('/resetPassword',resetPassword)
router.post('/logout',logoutUser)
router.route('/profile').get(protect,userProfile).put(protect,updateUserProfile)


export default router

