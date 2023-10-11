import React from 'react'
import Header from '../header/user/Header'
import HrHeader from '../header/hr/HrHeader'
import AdminHeader from '../header/admins/AdminHeader'

import Routers from '../../route/Routers'
import { useLocation } from 'react-router-dom'


const Lavoro = () => {
const location= useLocation()
let hr= location.pathname.startsWith('/hr');
let admin = location.pathname.startsWith('/admin')
  return (
    <div>   
 {
          (admin)?<AdminHeader/> :((hr)?<HrHeader /> : <Header />)
  
  }
     <Routers/>
    </div>
  )
}

export default Lavoro
