import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button, Card } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineMessage, AiOutlineUnorderedList } from 'react-icons/ai';
import { MdLogout, MdWorkOutline } from 'react-icons/md';
import { TiTick} from 'react-icons/ti';
import { NavLink, useNavigate } from 'react-router-dom';
import UserProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg';
import "./Applications.css"
import { usersApi } from '../../../axiosApi/axiosInstance';
import { toast } from 'react-toastify'


const Applications = () => {
    const navigate = useNavigate()
    const  [ applications, setApplications] = useState({})
    const user = JSON.parse(localStorage.getItem('userInfo'))
    useEffect(() => {
        if (!user) {
            return navigate('/login');
        }

        const fetchUser  = async () =>{
            const res = await usersApi.get(`/users/application/${user._id}`)
           if(res.status===200 && res.data.result){
            console.log(res.data.result);
            setApplications(res.data.result)
           }else{
            setApplications(res.data.error)
           }

        }
        fetchUser()

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
                                    <NavLink to="/logout" className='head'>Logout</NavLink>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col sm={9} className="content">
                        <div><h4 className='text-white py-3' >Applications</h4></div>
                        <div className='applicationMainDivs'>
                            {
                                applications.length>0 ?(
                                    applications.map((application,index)=>(

                            <Card className="applicationCard" style={{ width: '18rem' }} key={index}>
                                <Card.Body>
                                    <Card.Title>{application.jobDetails.companyName} </Card.Title>
                                    <Card.Text>Job Applied: {application.jobDetails.jobRole} </Card.Text>
                                    <Card.Text>Salary: {application.jobDetails.salary} </Card.Text>
                                    <Card.Text>Qualification: {application.jobDetails.qualification} </Card.Text>
                                    <Card.Text>Status: </Card.Text>
                                </Card.Body>
                            </Card>
                                    ))
                                ):null
                            }
                            </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Applications;
