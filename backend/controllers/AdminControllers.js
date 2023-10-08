import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js'
import generateToken from '../util/generateToken.js';
import { AdminSendOtpEmail } from './AdminSendOtpEmail.js'
import Category from '../models/category.js';

//  admin/auth
const authAdmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email })
    if (admin && (await admin.matchPassword(password))) {
        generateToken(res, admin._id);
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
        })
    } else {
        res.status(401);
        throw new Error(`Invalid email or password`)
    }
});


// admin/forgot
const AdminForgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) {
        return res.status(404).json({ message: 'Email not Found' })
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    admin.otp = otp;

    await admin.save();
    const emailSent = await AdminSendOtpEmail(admin.email, otp)
    if (emailSent) {
        res.status(200).json({ message: 'OTP Send' });
    } else {
        res.status(500).json({ message: 'Failed to send email' })
    }

    // ----------------remove this and uncomment above code 
    // const emailSent = true
    // if(emailSent){
    //         res.status(200).json({ message:'OTP Send'});
    //     }else{
    //           res.status(500).json({message:'Failed to send email'})
    //         }
})


// otp verify
//  route POST  api/admin/otp
const AdminOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({ email })

    if (admin.otp !== otp) {

        return res.status(400).json({ message: 'Wrong OTP' });
    } else {

        return res.status(200).json({ admin, message: 'OTP verified successfully' })
    }
})

// rest password
const AdminResetPassword = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    try {
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update the admin's password
        if (admin) {
            admin.password = password;
            const updateAdmin = await admin.save();

            res.status(200).json({ message: "Password reset successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" })
    }
})

// admin categoty add
// admin/category
const category = asyncHandler(async (req, res) => {
    const { categoryName } = req.body;
    console.log(req.body);
    try {
        // Check if any category already exists with a similar name
        const existingCategory = await Category.findOne({ categoryName: { $regex: new RegExp(categoryName, 'i') } });

        if (existingCategory) {
            return res.status(400).json({ message: "Category already added" });
        }

        // If the category doesn't exist, create and save it
        const categories = new Category({ categoryName });
        await categories.save();

        return res.status(201).json({ message: "Category added successfully" });
    } catch (error) {

        res.status(500).json({ message: "Internal Server error" });
    }
});

// get category
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({})
    res.status(200).json(categories);
})

// delete category
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const category = await Category.findByIdAndDelete(id)
    res.status(200).json({ message: 'Delete Successfully' })
    console.log(id);
})

// edit category

const editCategory = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const { categoryName } = req.body;

    try {

        const existingCategory = await Category.findById(categoryId);

        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Update the category 
        existingCategory.categoryName = categoryName;

        const updatedCategory = await existingCategory.save();

        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


export {
    authAdmin,
    AdminForgotPassword,
    AdminOtp,
    AdminResetPassword,
    category,
    deleteCategory,
    getCategories,
    editCategory
}