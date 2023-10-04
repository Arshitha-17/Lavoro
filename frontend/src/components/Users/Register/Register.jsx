import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Form, Row, Button } from "react-bootstrap";
import FormContainer from "../forms/FormContainer";
import userProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg'; // Replace with the actual image path
import { usersApi } from "../../../axiosApi/axiosInstance";
import { validateRegistrationForm } from "./formValidation"; // Import the validation function
import { toast } from "react-toastify";

const Register = () => {
  const userInfo = localStorage.getItem("userInfo");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [existingEmails, setExistingEmails] = useState([]); // You should populate this with existing emails

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
      confirmPassword,
    };



    // Validate the form data
    const errors = validateRegistrationForm(formData, existingEmails);
    try {
      if (Object.keys(errors).length === 0) {
        // If there are no validation errors, proceed with registration
        let res = await usersApi.post('users/register', formData);
  
        if (res.data) {
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          navigate('/');
        }
  
        console.log(res.data);
        console.log("submit");
      } else {
        // If there are validation errors, set them in state
        setValidationErrors(errors);
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
   
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  return (
    <FormContainer>
      <div className="hrLink text-white">Are you an HR <Link to="/hr/login">click here?</Link></div>
      <div className="p-3">
        <div className="userProfileDiv">
          <img src={userProfileImage} alt="User Profile" className="user-profile-image" />
        </div>
        <h1 className="heading">Register</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2 pt-2" controlId="name">
            <Form.Control
              className="userInput"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {validationErrors.name && <div className="text-danger">{validationErrors.name}</div>}
          </Form.Group>

          <Form.Group className="my-2 pt-2" controlId="email">
            <Form.Control
              className="userInput"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {validationErrors.email && <div className="text-danger">{validationErrors.email}</div>}
          </Form.Group>

          <Form.Group className="my-2 pt-2" controlId="password">
            <Form.Control
              className="userInput"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {validationErrors.password && <div className="text-danger">{validationErrors.password}</div>}
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
          <div className="pt-2">
            <Button type="submit" className="loginButton">
              Register
            </Button>
          </div>

          <Row className="py-3">
            <Col className="text-white">
              Already have an account? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </FormContainer>
  );
};

export default Register;
