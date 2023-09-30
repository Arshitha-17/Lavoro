import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Col, Form, Row, Button } from 'react-bootstrap'; 
import FormContainer from "../forms/FormContainer";
import React from 'react'
// import './Login.css'
import userProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg'; // Replace with the actual image path
// import { usersApi } from "../../axiosApi/axiosInstance";

const Login = () => {

//    const userInfo = localStorage.getItem("userInfo")
    const [email,setEmail] = useState('')
    // const navigate = useNavigate();

    const submitHandler= async(e)=>{
        e.preventDefault();
        console.log("submit");
        
    //     let formData= {
    //       email,password
    //     }

    //     let res = await usersApi.post('users/auth',formData)
    //     if(res.data){
    //       localStorage.setItem('userInfo',JSON.stringify(res.data))
    //       navigate('/')
    //     }
    //     console.log(res.data);
    //     console.log('User logined');
    // }

    // useEffect(()=>{
    //   if(userInfo){
    //     navigate('/')
    //   }
    // })
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

export default Login