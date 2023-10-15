import express from "express"
import { authAdmin,
     AdminForgotPassword,
     AdminOtp,
     AdminResetPassword,
     category,
     deleteCategory,
     getCategories,
     editCategory,
     UserBlock,
     HrBlock
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
adminRouter.put('/adminCategory/:id',editCategory)
adminRouter.post('/userBlock/:id',UserBlock)
adminRouter.post('/HrBlock/:id',HrBlock)


export default adminRouter

