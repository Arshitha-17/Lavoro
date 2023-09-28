import React from 'react'

import {Route, Routes} from 'react-router-dom'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />
        
    </Routes>
  )
}

export default Routers
