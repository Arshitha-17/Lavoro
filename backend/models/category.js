import mongoose from "mongoose";


const categorySchema = mongoose.Schema({
    categotyName:{
        type:String ,
        required: true
    }

},{
    timestamps:true
})


const Category = mongoose.model('Category',categorySchema);
export default Category;