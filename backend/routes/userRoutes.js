import express from "express"

import multer from "multer"

import { authUser,
    registerUser,
    logoutUser,
    userProfile,
    updateUserProfile,
    forgotPassword,
    otpVerify,
    resetPassword,
    jobList,
    categories,
    jobDetailPage
 } from "../controllers/userControllers.js"

const router = express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/public/resume'); // Store uploaded files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


import { protect } from "../middleware/authMiddleware.js"

// router.post('/',home)
router.post('/register',registerUser)
router.post('/auth',authUser)
router.post('/forgot',forgotPassword)
router.post('/otp',otpVerify)
router.post('/resetPassword',resetPassword)
router.post('/logout',logoutUser)
router.route('/profile/:id').get(userProfile).put(upload.single('resume'), updateUserProfile);
router.get('/jobList',jobList)
router.get('/categories',categories)
router.get('/jobDetails/:id',jobDetailPage)

export default router

  