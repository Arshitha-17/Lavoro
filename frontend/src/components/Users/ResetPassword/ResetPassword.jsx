import { useState } from "react";
import {  Form, Row, Button } from 'react-bootstrap'; 
import FormContainer from "../forms/FormContainer";
import React from 'react'
import userProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg'; // Replace with the actual image path

const ResetPassword = () => {
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    
    const email = location.state.email

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
      <h1 className="heading" >Reset Password</h1>    
      <Form onSubmit={submitHandler}> 
      <Form.Group className='my-2 pt-2' controlId='password'  >             
        <Form.Control className="userInput  "
        type='String'
        placeholder='Password'
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

        <Form.Group className="my-2 pt-2" controlId="confirmPassword">
            <Form.Control
              className="userInput"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {validationErrors.confirmPassword && (
              <div className="text-danger">{validationErrors.confirmPassword}</div>
            )}
          </Form.Group>
      <Button type='submit' className="loginButton " >Reset</Button>  
      </Form>
      </div>
    </FormContainer>
  )
}
export default ResetPassword
