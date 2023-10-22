import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineMessage, AiOutlineUnorderedList } from 'react-icons/ai';
import { MdLogout, MdWorkOutline } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io'
import { NavLink } from 'react-router-dom';
import HrProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg';
import "./Applications.css"
import { usersApi } from '../../../axiosApi/axiosInstance';
import { toast } from 'react-toastify'


const HrProfile = () => {
   



    return (
        <div>
            <Container fluid>
                <Row>
                    <Col className="sidebar m-4">

                        <div className='sidebar-Content'>
                            <div className="HrProfileImage">
                                <img src={HrProfileImage} alt="User Profile" className="hr-profile-image" />
                                <h2>Name</h2>
                            </div>
                            <div className='sidebar-headings'>
                                <div className='heads'>
                                    <div><AiOutlineUser /> </div>
                                    <NavLink to="/hr/profile" className='head'>Profile</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><AiOutlineMessage /> </div>
                                    <NavLink to="/hr/message" className='head'>Message</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><MdWorkOutline /> </div>
                                    <NavLink to="/hr/jobsAdd" className='head'>Post A job</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><AiOutlineUnorderedList /></div>
                                    <NavLink to="/hr/JobList" className='head'>List Job</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><IoMdNotificationsOutline /></div>
                                    <NavLink to="/hr/applications" className='head'>Applications</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><MdLogout /></div>
                                    <NavLink to="/hr/logout" className='head'>Logout</NavLink>
                                </div>

                            </div>
                        </div>
                    </Col>
                    <Col sm={9} className="content">
                        <div>
                          
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HrProfile;
