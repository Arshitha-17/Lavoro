import { useState } from "react";
import {  Form, Button } from 'react-bootstrap'; 
import FormContainer from "../../Users/forms/FormContainer";
import React from 'react';
import userProfileImage from './Untitled.jpeg'; 
import { useLocation, useNavigate } from "react-router-dom";
import { usersApi } from "../../../axiosApi/axiosInstance";
import {toast} from 'react-toastify'

const HrOtp = () => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state.email
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await usersApi.post('hr/HrOtp', { email, otp });
      if (res.status === 200) {
        navigate('/hr/resetPassword',{state:{email}})
      }
    } catch (error) {
      // Display the error message from the server response
      toast.error(error.response?.data?.message || "Something went wrong");
    }
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
export default HrOtp
