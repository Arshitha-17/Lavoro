import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button, Card } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineMessage, AiOutlineUnorderedList } from 'react-icons/ai';
import { MdLogout, MdWorkOutline } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io'
import { NavLink, useNavigate } from 'react-router-dom';
import HrProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg';
import "./Applications.css"
import { usersApi } from '../../../axiosApi/axiosInstance';
import { toast } from 'react-toastify'


const Applications = () => {
    const [applications, setApplications] = useState({})
    const navigate = useNavigate()


    useEffect(() => {
        const hr = JSON.parse(localStorage.getItem("HRInfo"))
        if (hr && hr._id) {
            const fetchHr = async () => {
                try {
                    const response = await usersApi.post(`/hr/HrApplications/${hr._id}`)
                    if (response.status == 200 && response.data.result) {
                        console.log(response.data.result);
                        setApplications(response.data.result)

                    } else {
                        toast.error(response.data.error)
                    }

                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
            fetchHr()
        }else{
            navigate('/hr/login')
            
        }
    },[])




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
                       

                            <div className='applicationMainDiv'>
                                {
                                    applications.length > 0 ? (
                                        applications.map((application, index) => (


                                            <Card className='applicationCard' style={{ width: '18rem' }} key={index}>
                                                <Card.Body>
                                                    <Card.Title className='userName' >{application.userDetails.name} </Card.Title>
                                                    <Card.Text>Job Applied: {application.jobDetails.jobRole} </Card.Text>
                                                    <Card.Text>Qualification: {application.userDetails.qualification} </Card.Text>
                                                    <Card.Text>Experience: {application.userDetails.experience} </Card.Text>
                                                    <Card.Text>Skills: {application.userDetails.skills} </Card.Text>
                                                    {/* <embed src={`http://localhost:5000/resume/${application.userDetails.resume}`} type="application/pdf" width="100%" height="500px" /> */}
                                                    <a href={`http://localhost:5000/resume/${application.userDetails.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a>
                                                    <div>
                                                  
                                                        <Button className='acceptBtn' variant="success">Accept</Button>
                                                        <Button className='rejectBtn' variant="danger">Reject</Button>
                                                    </div>
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
