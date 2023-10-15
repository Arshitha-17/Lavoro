import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const hrSchema = mongoose.Schema({
    name:{
        type:String ,
        required: true
    },
    email:{
        type:String ,
        required: true,
        unique:true
    },
    password:{
        type:String ,
        required: true
    },
    otp:{
        type:String ,
        required: false
    },
    isBlock:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})


hrSchema.pre('save',async function(next){
    if(!this.isModified(`password`)){
        next()
    }

    const  salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)

})

// bcrypt
hrSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}



const Hr = mongoose.model('Hr',hrSchema);
export default Hr;