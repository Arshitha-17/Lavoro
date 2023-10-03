import React from 'react'

import {Route, Routes} from 'react-router-dom'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ForgotScreen from '../screens/ForgotScreen'
import OtpScreen from '../screens/OtpScreen'
import ResetPasswordScreen from '../screens/ResetPasswordScreen'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />       
        <Route path='/forgot' element={<ForgotScreen/>} />       
        <Route path='/otp' element={<OtpScreen/>} />       
        <Route path='/resetPasswoed' element={<ResetPasswordScreen/>} />       
    </Routes>
  )
}

export default Routers
