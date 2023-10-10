import express from "express"
import { authHr,
    HRregister,
    HrForgotPassword,
    HrOtp,
    HrResetPassword, 
    jobAdding} from "../controllers/hrControllers.js"

const HRrouter = express.Router()

// import { protect } from "../middleware/authMiddleware.js"

HRrouter.post('/authHr',authHr)
HRrouter.post('/HrRegister',HRregister)
HRrouter.post('/HrForgot',HrForgotPassword)
HRrouter.post('/HrOtp',HrOtp)
HRrouter.post('/HrResetPassword',HrResetPassword)
HRrouter.post('/HrJobAdd',jobAdding)



export default HRrouter

