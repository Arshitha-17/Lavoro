import express from "express"
import multer from 'multer';


const storage = multer.diskStorage({
     destination: (req, file, cb) => {
       cb(null, 'backend/public/images');
     },
     filename: (req, file, cb) => {
       cb(null, `${Date.now()}-${file.originalname}`);
     },
   });
   
   const upload = multer({ storage });
   

import { authAdmin,
     AdminForgotPassword,
     AdminOtp,
     AdminResetPassword,
     category,
     deleteCategory,
     getCategories,
     editCategory,
     UserBlock,
     HrBlock,
     allUsers,
     allHr     
     } from "../controllers/AdminControllers.js"

const adminRouter = express.Router()

// import { protect } from "../middleware/authMiddleware.js"

adminRouter.post('/authAdmin',authAdmin)
adminRouter.post('/adminForgot',AdminForgotPassword)
adminRouter.post('/AdminOtp',AdminOtp)
adminRouter.post('/AdminResetPassword',AdminResetPassword)

// Route to add a new category with an image
adminRouter.post('/adminCategory', upload.single('categoryImage'), category);


adminRouter.delete('/adminCategory/:id',deleteCategory)
adminRouter.get('/adminCategory',getCategories)
adminRouter.put('/adminCategory/:id',editCategory)
adminRouter.post('/userBlock/:id',UserBlock)
adminRouter.post('/HrBlock/:id',HrBlock)
adminRouter.get('/allUsers',allUsers)
adminRouter.get('/allHr',allHr)


export default adminRouter

