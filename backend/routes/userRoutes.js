import express from "express"
import { authUser,
    registerUser,
    logoutUser,
    userProfile,
    updateUserProfile } from "../controllers/userControllers.js"

const router = express.Router()

router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.route('/profile').get(userProfile).put(updateUserProfile)


export default router

