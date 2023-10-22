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
    updateHrProfile} from "../controllers/hrControllers.js"

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
HRrouter.route('/HrProfile/:id').get(hrProfile).put(updateHrProfile);


export default HRrouter

