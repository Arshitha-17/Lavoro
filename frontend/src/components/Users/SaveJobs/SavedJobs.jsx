import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineMessage, AiOutlineUnorderedList } from 'react-icons/ai';
import { MdLogout, MdWorkOutline } from 'react-icons/md';
import { BsSave } from "react-icons/bs"
import { TiTick} from 'react-icons/ti';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import UserProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg';
import "./SavedJobs.css"
import { usersApi } from '../../../axiosApi/axiosInstance';
import { toast } from 'react-toastify'


const SavedJobs = () => {

    const [saveJobs,setSaveJobs] = useState([])
    const navigate = useNavigate();
 
const user = JSON.parse(localStorage.getItem("userInfo"))
useEffect(()=>{
    const fetchSavedJobs = async()=>{
        const res = await usersApi.get(`users/saveJobs/${user._id}`)
      
        setSaveJobs(res.data.result)
    }
    fetchSavedJobs()
},[])



    return (
        <div>
            <Container fluid>
                <Row>
                    <Col className="sidebar m-4">
                        <div className='sidebar-Content'>
                            <div className="HrProfileImage">
                                <img src={UserProfileImage} alt="User Profile" className="hr-profile-image" />
                                <h2>Name</h2>
                            </div>
                            <div className='sidebar-headings'>
                                <div className='heads'>
                                    <div><AiOutlineUser /></div>
                                    <NavLink to="/profile" className='head'>Profile</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><AiOutlineMessage /></div>
                                    <NavLink to="/message" className='head'>Message</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><MdWorkOutline /></div>
                                    <NavLink to="/JobList" className='head'>List Job</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><TiTick /></div>
                                    <NavLink to="/applications" className='head'>Applications</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><AiOutlineUnorderedList /></div>
                                    <NavLink to="/savedJobs" className='head'>Saved Jobs</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><MdLogout /></div>
                                    <NavLink to="/hr/logout" className='head'>Logout</NavLink>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={9} className="content">
                    <div >
        <div className='listdiv'>
          <h6>Latest Job Listing: </h6>
        </div>
        <div className="mainDiv">
         {
            saveJobs.length >0 ?(
                saveJobs.map((jobs,index)=>(

              <div className='subdiv my-2 rounded' key={index} >
                <h5 className='mainheads'>{jobs.jobDetails.companyName} </h5>
                <div className='subheads '>
                  <h6 className='sub' > {jobs.jobDetails.jobRole} </h6>
                  <h6 className='sub'>{jobs.jobDetails.jobType}  </h6>
                  <h6 className='sub'> {jobs.jobDetails.jobLocation} </h6>
                  <h6 className='sub'> {jobs.jobDetails.salary}</h6>
                  
                  <button onClick={() => {
                    navigate(`/jobDetails/${jobs.jobDetails._id}`)
                  }} className='delete'  >Apply</button>
                </div>
              </div>
                ))
            ):null
         }
           
        </div>

      </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SavedJobs;
