import { useState } from "react";
import { Link } from 'react-router-dom'
import { Col, Form, Row, Button } from 'react-bootstrap'; 

import FormContainer from "../forms/FormContainer";

import React from 'react'

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const submitHandler= async(e)=>{
        e.preventDefault();
        console.log("submit");
    }
  return (
    <FormContainer>
      <h1>SignIn</h1>
      <Form onSubmit={submitHandler}> 
      <Form.Group className='my-2 ' controlId='email'  >
        <Form.Label>Email</Form.Label>
        <Form.Control
        type='email'
        placeholder='Enter email'
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}
        >
    </Form.Control>
      </Form.Group>

      <Form.Group className='my-2 ' controlId='password'  >
        <Form.Label>Password</Form.Label>
        <Form.Control
        type='password'
        placeholder='Enter password'
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button type='submit' className="mt-3" >Login</Button>
      <Row className="py-3 ">
        <Col>New User? <Link to='/register' >Register</Link> </Col>
      </Row>

      </Form>
    </FormContainer>
  )
}

export default Login
