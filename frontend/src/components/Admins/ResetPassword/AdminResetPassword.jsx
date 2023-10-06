import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import FormContainer from "../../Users/forms/FormContainer";
import React from 'react'
import userProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg'; // Replace with the actual image path
import { usersApi } from "../../../axiosApi/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HrResetPassword = () => {
    const location = useLocation()
    const email = location.state.email;

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("submit");
        if(password!==confirmPassword){
            toast.error("Password not match")
            return
        }

        const res = await usersApi.post('admin/AdminResetPassword', { email, password, confirmPassword });
        try {
            if (res.status === 200) {
                navigate('/admin/login')
            }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
            console.log(error.response.data.message);
        }
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
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    </Form.Group>
                    <Button type='submit' className="loginButton " >Reset</Button>
                </Form>
            </div>
        </FormContainer>
    )
}
export default HrResetPassword
