import express from "express"
import { authAdmin,
     AdminForgotPassword,
     AdminOtp,
     AdminResetPassword,
     category,
     deleteCategory,
     getCategories
     } from "../controllers/AdminControllers.js"

const adminRouter = express.Router()

// import { protect } from "../middleware/authMiddleware.js"

adminRouter.post('/authAdmin',authAdmin)
adminRouter.post('/adminForgot',AdminForgotPassword)
adminRouter.post('/AdminOtp',AdminOtp)
adminRouter.post('/AdminResetPassword',AdminResetPassword)
adminRouter.post('/adminCategory',category)
adminRouter.delete('/adminCategory/:id',deleteCategory)
adminRouter.get('/adminCategory',getCategories)



export default adminRouter

