import express from "express"
import { authHr,
    HRregister,
    HrForgotPassword,
    HrOtp,
    HrResetPassword, 
    getCategories,
    jobAdding,
    jobList,
    deleteJob,
    hrProfile,
    updateHrProfile,
    applicationList,
    acceptApplication,
    rejectApplication,
    getHrDetails} from "../controllers/hrControllers.js"


    import chatController from "../controllers/chatController.js"

const HRrouter = express.Router()

// import { protect } from "../middleware/authMiddleware.js"

HRrouter.post('/authHr',authHr)
HRrouter.post('/HrRegister',HRregister)
HRrouter.post('/HrForgot',HrForgotPassword)
HRrouter.post('/HrOtp',HrOtp)
HRrouter.post('/HrResetPassword',HrResetPassword)
HRrouter.post('/HrJobAdd',jobAdding)
HRrouter.get('/getCategories',getCategories)
HRrouter.get('/HrJobList',jobList)
HRrouter.delete('/HrJobList/:id',deleteJob)
HRrouter.get('/HrProfile/:id',hrProfile)
HRrouter.put('/HrProfile/:id',updateHrProfile);
HRrouter.post("/HrApplications/:id",applicationList)
HRrouter.put("/acceptApplication/:id",acceptApplication)
HRrouter.put("/rejectApplication/:id",rejectApplication)
HRrouter.get('/getHrDetails/:id',getHrDetails)

// chat routes

HRrouter.get("/get-hr-rooms/:hr",chatController.getHrRoom)
HRrouter.post('/sendChat/:chatId/:sender/:type', chatController.chatSend)
HRrouter.get("/get-room-messages/:roomid", chatController.getMessage)



export default HRrouter

