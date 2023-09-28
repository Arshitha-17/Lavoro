import { useState } from "react";
import { Link } from 'react-router-dom'
import { Col, Form, Row, Button } from 'react-bootstrap'; 
import FormContainer from "../forms/FormContainer";
import React from 'react'
import './Login.css'
import userProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg'; // Replace with the actual image path


const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const submitHandler= async(e)=>{
        e.preventDefault();
        console.log("submit");
    }
  return (
    <FormContainer  >
      <div className="hrLink text-white" >Are you an hr <Link to='/hr/login' >click here?</Link></div>
      <div className="p-5">

      <div className="userProfileDiv">
        <img src={userProfileImage} alt="User Profile" className="user-profile-image" />
      </div>
      <h1 className="heading" >SignIn</h1>
     
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

      <Form.Group className='my-2 pt-2' controlId='password'  >
        
        <Form.Control className="userInput  "
        type='password'
        placeholder='Password'
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <div className=" forgotDiv">
      <Button type='submit' className="loginButton " >Login</Button>
      <Col className="forgotLink" > <Link to='/forgot' >forgotpassword ? </Link> </Col>
      </div>
      <Row className="py-3 ">
        <Col className="text-white" >New User? <Link to='/register' >Register</Link> </Col>
      </Row>

      </Form>
      </div>
    </FormContainer>
  )
}

export default Login

