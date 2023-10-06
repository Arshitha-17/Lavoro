import express from "express"
import { authAdmin,
     AdminForgotPassword,
     AdminOtp,
     AdminResetPassword
     } from "../controllers/AdminControllers.js"

const adminRouter = express.Router()

// import { protect } from "../middleware/authMiddleware.js"

adminRouter.post('/authAdmin',authAdmin)
adminRouter.post('/adminForgot',AdminForgotPassword)
adminRouter.post('/AdminOtp',AdminOtp)
adminRouter.post('/AdminResetPassword',AdminResetPassword)



export default adminRouter

