import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    categoryName:{
        type:String ,
        required: false
    },
    deleted:{
        type:Boolean,
        default:false
    },
    image:{
        type:String,
        required:true
        
    }

},{
    timestamps:true
})


const Category = mongoose.model('Category',categorySchema);
export default Category;