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
    jobDetailPage,
    sendApplication,
    checkApplicationStatus,
    applicationList,
    getJobs,
    saveJobs,
    getSaveJobs
 } from "../controllers/userControllers.js"


 import chatController from '../controllers/chatController.js' 

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
router.get('/homepageJobList',getJobs)
router.get('/jobList/:id',jobList)
router.get('/categories',categories)
router.get('/jobDetails/:id',jobDetailPage)
router.post('/jobDetails/:jobId/:userId',sendApplication)
router.post('/jobDetails/:jobId/:userId',checkApplicationStatus)
router.get('/application/:id',applicationList)
router.post('/saveJobs/:jobId/:id',saveJobs)
router.get('/saveJobs/:id',getSaveJobs)


// chat routes

router.get("/getRooms/:user",chatController.getRoom)
router.post("/get-or-createroom/:user/:hr",chatController.createRoom)
router.post('/sendChat/:chatId/:sender/:type', chatController.chatSend)
router.get("/get-room-messages/:roomid", chatController.getMessage)



export default router

  