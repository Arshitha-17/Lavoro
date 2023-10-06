import express from "express"
import { authAdmin,
     AdminForgotPassword
     } from "../controllers/AdminControllers.js"

const adminRouter = express.Router()

// import { protect } from "../middleware/authMiddleware.js"

adminRouter.post('/authAdmin',authAdmin)
adminRouter.post('/adminForgot',AdminForgotPassword)



export default adminRouter

