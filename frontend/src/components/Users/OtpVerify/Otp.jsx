import { useState, useEffect } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import FormContainer from "../forms/FormContainer";
import userProfileImage from './Untitled.jpeg';
import { useLocation, useNavigate } from "react-router-dom";
import { usersApi } from "../../../axiosApi/axiosInstance";
import { toast } from 'react-toastify';
import "./Otp.css";

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(20); 
  const [resendDisabled, setResendDisabled] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(countdownInterval); 
        setResendDisabled(false);
        setAlertVisible(true);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [timer]);

  const startResendTimer = () => {
    setResendDisabled(true);
    setAlertVisible(false);
    setTimer(20);
  };

  const handleResendClick = async () => {
    try {
      const res = await usersApi.post('users/forgot', { email });
      if (res.status === 200) {
        startResendTimer();
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (timer === 0) {
      setResendDisabled(false);
      setAlertVisible(true);
      return;
    }
    try {
      const res = await usersApi.post('users/otp', { email, otp });
      if (res.status === 200) {
        navigate('/resetPassword', { state: { email } });
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <FormContainer>
      <div className="p-5">
        <div className="userProfileDiv">
          <img src={userProfileImage} alt="User Profile" className="user-profile-image" />
        </div>
        <h1 className="heading">OTP</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="otp">
            <Form.Control
              type="number"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={timer === 0}
            />
          </Form.Group>
          <p className=" pt-2 text-white">Timer: {timer} seconds</p>
          {alertVisible && (
            <Alert variant="danger">
              Time has already expired. Click Resend to get a new OTP.
            </Alert>
          )}
          <div className="buttons display-flex">
            <Button type="submit" className="loginButton">
              Verify
            </Button>
            {timer === 0 && (
            <Button
              type="button"
              className="resendButton"
              onClick={handleResendClick}
              disabled={resendDisabled}
            >
              {resendDisabled ? "Resend" : "Resend"}
            </Button>
          )}
          </div>
        </Form>
      </div>
    </FormContainer>
  );
};

export default Otp;
