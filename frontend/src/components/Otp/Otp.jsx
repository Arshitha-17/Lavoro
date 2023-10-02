import { useState } from "react";
import { Link } from 'react-router-dom'
import {  Form, Row, Button } from 'react-bootstrap'; 
import FormContainer from "../forms/FormContainer";
import React from 'react'

import userProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg'; // Replace with the actual image path

const Otp = () => {

   
    const [otp,setOtp] = useState('')
   
   
    const submitHandler= async(e)=>{
        e.preventDefault();
        console.log("submit");
        
    
    }
  return (
    <FormContainer  >
    
      <div className="p-5">

      <div className="userProfileDiv">
        <img src={userProfileImage} alt="User Profile" className="user-profile-image" />
      </div>
      <h1 className="heading" >OTP</h1>
     
      <Form onSubmit={submitHandler}> 
      <Form.Group className='my-2 pt-2' controlId='otp'  >    
         
        <Form.Control className="userInput  "
        type='Number'
        placeholder='OTP'
        value={otp} 
        onChange={(e)=>setOtp(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button type='submit' className="loginButton " >Verify</Button>  
      </Form>
      </div>
    </FormContainer>
  )
}

export default Otp
