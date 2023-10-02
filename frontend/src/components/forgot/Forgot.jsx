import { useState } from "react";

import {  Form, Row, Button } from 'react-bootstrap'; 
import FormContainer from "../forms/FormContainer";
import React from 'react'
import './Forgot.css'
import userProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg'; // Replace with the actual image path
import { useNavigate } from "react-router-dom";
import { usersApi } from "../../axiosApi/axiosInstance";
import {toast} from 'react-toastify'

const Forgot = () => {
  const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const submitHandler= async(e)=>{
        e.preventDefault();
        console.log("submit");  


        try {
          const res = await usersApi.post('users/forgot',{email})
          if(res.status===200){
            navigate('users/otp')
          }

        } catch (error) {
          toast.error(error.response.data.message)
          console.log(error.response.data.message);

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
      <Button type='submit' className="loginButton " >Send</Button>
      </Form>
      </div>
    </FormContainer>
  )
}

export default Forgot