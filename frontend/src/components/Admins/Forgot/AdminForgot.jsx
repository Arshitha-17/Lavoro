import { useState } from "react";

import {  Form, Row, Button } from 'react-bootstrap'; 
import FormContainer from "../../Users/forms/FormContainer";
import React from 'react'
import './AdminForgot.css'
import userProfileImage from './Untitled.jpeg'; 
import { useNavigate } from "react-router-dom";
import { usersApi } from "../../../axiosApi/axiosInstance";
import {toast} from 'react-toastify'

const AdminForgot = () => {
  const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const submitHandler= async(e)=>{
        e.preventDefault();
        console.log("submit");  
        try {
          const res = await usersApi.post('admin/AdminForgot',{email})         
          if(res.status===200){
            navigate('/admin/otp',{ state:{ email:email } }) 
          }
        } catch (error) {
          toast.error(error.response.data.message)
          console.log(error);

        }
   
    }

  return (
    <FormContainer  >
   
      <div className="p-3">

      <div className="userProfileDiv">
        <img src={userProfileImage} alt="User Profile" className="user-profile-image" />
      </div>
      <h1 className="heading" >Fotgot Password</h1>
     
      <Form onSubmit={submitHandler}> 
      <Form.Group className='my-2 pt-2' controlId='email'  >
      
        <Form.Control className="userInput " 
        type='email'
        placeholder='Email'
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}
        >
    </Form.Control>
      </Form.Group>
      <Button type='submit' className="loginButton " >Sent OTP</Button>
      </Form>
      </div>
    </FormContainer>
  )
}

export default AdminForgot