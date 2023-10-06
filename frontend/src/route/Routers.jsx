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
import HRForgotScreen from '../screens/HR/HRForgotScreen'
import HROtpScreen from '../screens/HR/HROtpScreen'
import HRResetPassword from '../screens/HR/HRResetPassword'

// -----------------Admin--------------

import AdminLoginScreen from '../screens/Admins/AdminLoginScreen'
import AdminForgotScreen from '../screens/Admins/AdminForgotScreen'
import AdminOtpScreen from '../screens/Admins/AdminOtpScreen'
import AdminResetPasswordScreen from '../screens/Admins/AdminResetPasswordScreen'


const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />       
        <Route path='/forgot' element={<ForgotScreen/>} />       
        <Route path='/otp' element={<OtpScreen/>} />       
        <Route path='/resetPassword' element={<AdminResetPasswordScreen/>} />   


{/*-------------- HR Routes--------------  */}
        <Route path='/hr/login' element={<HRLoginScreen/> } />
        <Route path='/hr/register' element={<HRRegisterScreen/> } />
        <Route path='/hr/forgot' element={<HRForgotScreen/> } />
        <Route path='/hr/otp' element={<HROtpScreen/> } />
        <Route path='/hr/resetpassword' element={<HRResetPassword/> } />
        <Route path='/hr' element={<HRHomeScreen/>} />


{/* ----------------Admin Routes------------- */}
<Route path='/admin/login' element={<AdminLoginScreen/> } />
<Route path='/admin/forgot' element={<AdminForgotScreen/> } />
<Route path='/admin/otp' element={<AdminOtpScreen/> } />
<Route path='/admin/resetPassword' element={<AdminResetPasswordScreen/> } />

    </Routes>
  )
}

export default Routers
