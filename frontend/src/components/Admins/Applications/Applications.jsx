import { Container, Row, Col, Card } from 'react-bootstrap';
import HrProfileImage from './Untitled.jpeg'; 
import { AiOutlineUser, AiOutlineMessage, AiOutlineUnorderedList, } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdLogout, MdWorkOutline } from 'react-icons/md'
import { NavLink } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import "./Applications.css"
import { usersApi } from '../../../axiosApi/axiosInstance';

const Applications = () => {

    const [applications, setApplications] = useState({})

    useEffect(() => {

        const fetchApplications = async () => {
            const res = await usersApi.get(`admin/applications`)
            if (res.status === 200) {
                console.log(res.data.result);
                setApplications(res.data.result)
            } else {
                setApplications(res.data.error)
            }

        }
        fetchApplications()

    }, [])

    return (
        <div>
            <Container fluid>
                <Row>
               
                    <Col  className="sidebar m-4">

                        <div className='sidebar-Content'>
                            <div className="HrProfileImage">
                                <img src={HrProfileImage} alt="User Profile" className="hr-profile-image" />
                                <h2>Admin</h2>
                            </div>
                            <div className='sidebar-headings'>

                                <div className='heads'>
                                    <div><AiOutlineMessage /> </div>
                                    <NavLink to="/admin/hr_manage" className='head'>Hr Details</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><MdWorkOutline /> </div>
                                    <NavLink to="/admin/user_manage" className='head'>User Details</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><AiOutlineUnorderedList /></div>
                                    <NavLink to="/admin/JobList" className='head'>List Job</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><IoMdNotificationsOutline /></div>
                                    <NavLink to="/admin/applications" className='head'>Applications</NavLink>
                                </div>
                                <div className='heads'>
                                    <div><MdLogout /></div>
                                    <NavLink to="/admin/logout" className='head'>Logout</NavLink>
                                </div>

                            </div>
                        </div>
                    </Col>

                    <Col sm={9} className="content">
                        <div><h4 className='text-white py-3' >Applications</h4></div>
                        <div className='applicationMainDivs'>

                            {
                                applications.length > 0 ? (
                                    applications.map((application, index) => (
                                        
                                        <Card className="applicationCard" style={{ width: '18rem' }} key={index}>
                                            <Card.Body>
                                                <Card.Title>{application.jobDetails.companyName} </Card.Title>
                                                <Card.Text>Job Applied: {application.jobDetails.jobRole} </Card.Text>
                                                <Card.Text>Salary: {application.jobDetails.salary} </Card.Text>
                                                <Card.Text>Qualification: {application.jobDetails.qualification} </Card.Text>
                                             
                                            </Card.Body>
                                        </Card>
                                    ))
                                ) : null
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Applications;
