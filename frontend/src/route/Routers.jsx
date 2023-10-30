import React from 'react'

import {Route, Routes} from 'react-router-dom'
import HomeScreen from '../screens/Users/HomeScreen'
import LoginScreen from '../screens/Users/LoginScreen'
import RegisterScreen from '../screens/Users/RegisterScreen'
import ForgotScreen from '../screens/Users/ForgotScreen'
import OtpScreen from '../screens/Users/OtpScreen'
import ResetPasswordScreen from '../screens/Users/ResetPasswordScreen'
import JobListingScreen from '../screens/Users/JobListingScreen'
import UserProfileScreen from '../screens/Users/UserProfileScreen'
import JobDetailScreen from '../screens/Users/JobDetailScreen'
import ApplicationScreen from '../screens/Users/ApplicationScreen'

// --------------HR------------------
import HRLoginScreen from '../screens/HR/HRLoginScreen'
import HRRegisterScreen from '../screens/HR/HRRegisterScreen'
import HRHomeScreen from '../screens/HR/HRHomeScreen'
import HRForgotScreen from '../screens/HR/HRForgotScreen'
import HROtpScreen from '../screens/HR/HROtpScreen'
import HRResetPassword from '../screens/HR/HRResetPassword'
import HRJobAddScreen from '../screens/HR/HRJobAddScreen'
import HRJobListScreen from '../screens/HR/HRJobListScreen'
import HRProfileScreen from '../screens/HR/HRProfileScreen'
import HRApplicationScreen from '../screens/HR/HRApplicationScreen'

// -----------------Admin--------------

import AdminLoginScreen from '../screens/Admins/AdminLoginScreen'
import AdminForgotScreen from '../screens/Admins/AdminForgotScreen'
import AdminOtpScreen from '../screens/Admins/AdminOtpScreen'
import AdminResetPasswordScreen from '../screens/Admins/AdminResetPasswordScreen'
import AdminCategoryScreen from '../screens/Admins/AdminCategoryScreen'
import AdminUserManageScreen from '../screens/Admins/AdminUserManageScreen'
import AdminHrManageScreen from '../screens/Admins/AdminHrManageScreen'
import AdminJobListScreen from '../screens/Admins/AdminJobListScreen'
import SavedJobsScreen from '../screens/Users/SavedJobsScreen'


const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />       
        <Route path='/forgot' element={<ForgotScreen/>} />       
        <Route path='/otp' element={<OtpScreen/>} />       
        <Route path='/resetPassword' element={<ResetPasswordScreen/>} />   
        <Route path='/jobList' element={<JobListingScreen/>} />   
        <Route path='/profile' element={<UserProfileScreen/>} />   
        <Route path='/jobDetails/:jobId' element={<JobDetailScreen/>} />   
        <Route path='/applications' element={<ApplicationScreen/>} />   
        <Route path='/savedJobs' element={<SavedJobsScreen/>} />   


{/*-------------- HR Routes--------------  */}
        <Route path='/hr/login' element={<HRLoginScreen/> } />
        <Route path='/hr/register' element={<HRRegisterScreen/> } />
        <Route path='/hr/forgot' element={<HRForgotScreen/> } />
        <Route path='/hr/otp' element={<HROtpScreen/> } />
        <Route path='/hr/resetpassword' element={<HRResetPassword/> } />
        <Route path='/hr' element={<HRHomeScreen/>} />
        <Route path='/hr/jobsAdd' element={<HRJobAddScreen/>} />
        <Route path='/hr/JobList' element={<HRJobListScreen/>} />
        <Route path='/hr/profile' element={<HRProfileScreen/>} />
        <Route path='/hr/applications' element={<HRApplicationScreen/>} />


{/* ----------------Admin Routes------------- */}
<Route path='/admin/login' element={<AdminLoginScreen/> } />
<Route path='/admin/forgot' element={<AdminForgotScreen/> } />
<Route path='/admin/otp' element={<AdminOtpScreen/> } />
<Route path='/admin/resetPassword' element={<AdminResetPasswordScreen/> } />
<Route path='/admin/categories' element={<AdminCategoryScreen/> } />
<Route path='/admin/user_manage' element={<AdminUserManageScreen/> } />
<Route path='/admin/hr_manage' element={<AdminHrManageScreen/> } />
<Route path='/admin/jobList' element={<AdminJobListScreen/> } />

    </Routes>
  )
}

export default Routers
