import { useState } from "react";
import { Link } from 'react-router-dom'
import { Col, Form, Row, Button } from 'react-bootstrap'; 
import FormContainer from "../forms/FormContainer";
import React from 'react'
import '../Login/Login.css'
import userProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg'; // Replace with the actual image path

const Register = () => {
    
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setconfirmPassword] = useState('')


    const submitHandler= async(e)=>{
        
        e.preventDefault();
        console.log("submit");
    }
  return (
    <FormContainer  >
      <div className="hrLink text-white" >Are you an hr <Link to='/hr/login' >click here?</Link></div>
      <div className="p-3">

      <div className="userProfileDiv">
        <img src={userProfileImage} alt="User Profile" className="user-profile-image" />
      </div>
      <h1 className="heading" >Register</h1>
     
      <Form onSubmit={submitHandler }> 
      <Form.Group className='my-2 pt-2' controlId='name'  >
        {/* <Form.Label>Email</Form.Label> */}
        <Form.Control className="userInput " 
        type='text'
        placeholder='Name'
        value={name} 
        onChange={(e)=>setName(e.target.value)}
        >
    </Form.Control>
      </Form.Group>

      <Form.Group className='my-2 pt-2' controlId='email'  >
        <Form.Control className="userInput " 
        type='email'
        placeholder='Email'
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}
        >
    </Form.Control>
      </Form.Group>

      <Form.Group className='my-2 pt-2' controlId='password'  >  
        <Form.Control className="userInput  "
        type='password'
        placeholder='Password'
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2 pt-2' controlId='confirmPassword'  >
      
        <Form.Control className="userInput  "
        type='password'
        placeholder='Confirm Password'
        value={confirmPassword} 
        onChange={(e)=>setconfirmPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>
        <div className="pt-2">
      <Button type='submit' className="loginButton " >Register</Button>
        </div>

      <Row className="py-3 ">
        <Col className="text-white" >Already have an account ? <Link to='/login' >Login</Link> </Col>
      </Row>

      </Form>
      </div>
    </FormContainer>
  )
}

export default Register

