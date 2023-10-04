import React from 'react'

import {Route, Routes} from 'react-router-dom'
import HomeScreen from '../screens/Users/HomeScreen'
import LoginScreen from '../screens/Users/LoginScreen'
import RegisterScreen from '../screens/Users/RegisterScreen'
import ForgotScreen from '../screens/Users/ForgotScreen'
import OtpScreen from '../screens/Users/OtpScreen'
import ResetPasswordScreen from '../screens/Users/ResetPasswordScreen'

// --------------HR------------------
import HRLoginScreen from '../screens/HR/HRLoginScreen'
import HRRegisterScreen from '../screens/HR/HRRegisterScreen'
import HRHomeScreen from '../screens/HR/HRHomeScreen'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />       
        <Route path='/forgot' element={<ForgotScreen/>} />       
        <Route path='/otp' element={<OtpScreen/>} />       
        <Route path='/resetPassword' element={<ResetPasswordScreen/>} />   


{/*-------------- HR Routes--------------  */}
        <Route path='/hr/login' element={<HRLoginScreen/> } />
        <Route path='/hr/register' element={<HRRegisterScreen/> } />
        <Route path='/hr' element={<HRHomeScreen/>} />

    </Routes>
  )
}

export default Routers
