import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
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
    image:{
        type:String,
        required:false

    },
    isBlock:{
        type:Boolean,
        default:false
    },
    qualification:{
        type:String,
        default:false
    },
    experience:{
        type:String,
        default:false
    },
    skills:{
        type:String,
        default:false
    },
    bio:{
        type:String,
        default:false
    },
},{
    timestamps:true
})


userSchema.pre('save',async function(next){
    if(!this.isModified(`password`)){
        next()
    }

    const  salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)

})

// bcrypt
userSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}



const User = mongoose.model('User',userSchema);
export default User;