import asyncHandler from 'express-async-handler'
import Hr from '../models/hrModel.js'
import generateToken from '../util/generateToken.js'; 


const authHr= asyncHandler(async(req,res)=>{
    console.log('Endhaanu bro ');
    const {email,password} = req.body;   
    const  hr = await Hr.findOne({email})   
    if(hr && (await hr.matchPassword(password))){
        generateToken(res,hr._id);
        res.status(201).json({
            _id:hr._id,
            name:hr.name,
            email:hr.email,           
        })
    }else{
        res.status(401);
        throw new Error(`Invalid email or password`)
    }
});

// hr register 
// route POST /api/hr
const HRregister= asyncHandler(async(req,res)=>{
    console.log('Hey Hr register');
    const {name,email,password} = req.body
    console.log(req.body);

   

    const HrExist = await Hr.findOne({email})
    if(HrExist){
        res.status(400);
        throw new Error(`Email already exist`)
        
    }
    const hr = await Hr.create({
        name,
        email,
        password
    })

    if(hr){
        generateToken(res,hr._id);
        res.status(201).json({
            _id:hr._id,
            name:hr.name,
            email:hr.email,
           
        })
    }else{
        res.status(400);
        throw new Error(`Invalid User data`)
    }
})






export{
    authHr,
    HRregister
}