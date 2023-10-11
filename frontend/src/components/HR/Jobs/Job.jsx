import React from 'react';
import { Container, Row, Col, Nav, Form, Button } from 'react-bootstrap';
import './Job.css'; // Import your CSS file
import { LinkContainer } from 'react-router-bootstrap';
import HrProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg'; // Replace with the actual image path
import { AiOutlineUser, AiOutlineMessage, AiOutlineUnorderedList, } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdLogout, MdWorkOutline } from 'react-icons/md'
import FormContainer from '../../Users/forms/FormContainer';

const Job = () => {
    return (
        <Container fluid>
            <Row>
                <Col className="sidebar m-4">
                    <div className='sidebar-Content'>
                        <div className="HrProfileImage">
                            <img src={HrProfileImage} alt="User Profile" className="hr-profile-image" />
                            <h2>Name</h2>
                        </div>
                        <div className='sidebar-headings'>
                            <Nav defaultActiveKey="/hr/profile" className="flex-column">
                                <LinkContainer to="/hr/profile">
                                    <div className=''>
                                        <Nav.Link> <span className='icons text-white ' >
                                            <AiOutlineUser />
                                        </span>
                                            <span className='sidebar_content'> My Profile</span></Nav.Link>
                                    </div>
                                </LinkContainer>
                                <Nav defaultActiveKey="/hr/message" className="flex-column"></Nav>
                                <LinkContainer to="/hr/message">
                                    <div>
                                        <Nav.Link><span className='icons text-white '  ><AiOutlineMessage /></span>
                                            <span className='sidebar_content'>Message</span>
                                        </Nav.Link>
                                    </div>
                                </LinkContainer>
                                <Nav defaultActiveKey="/hr/jobsAdd" className="flex-column"></Nav>
                                <LinkContainer to="/hr/jobsAdd">
                                    <div>
                                        <Nav.Link><span className='icons text-white'><MdWorkOutline /></span>
                                            <span className='sidebar_content'>Post A Job</span></Nav.Link>
                                    </div>
                                </LinkContainer>
                                <Nav defaultActiveKey="/hr/jobList" className="flex-column"></Nav>
                                <LinkContainer to="/hr/jobList">
                                    <div>
                                        <Nav.Link> <span className='icons text-white'><AiOutlineUnorderedList /> </span>
                                            <span className='sidebar_content'>List Job</span> </Nav.Link>
                                    </div>
                                </LinkContainer>
                                <Nav defaultActiveKey="/hr/applications" className="flex-column"></Nav>
                                <LinkContainer to="/hr/applications">
                                    <div>
                                        <Nav.Link><span className='icons text-white'><IoMdNotificationsOutline /> </span>
                                            <span className='sidebar_content text-white'> Applications</span></Nav.Link>
                                    </div>
                                </LinkContainer>
                                <Nav defaultActiveKey="/hr/logout" className="flex-column"></Nav>
                                <LinkContainer to="/hr/logout">
                                    <div>
                                        <Nav.Link><span className='icons text-white'><MdLogout /></span>
                                            <span className='sidebar_content'> Logout</span></Nav.Link>
                                    </div>
                                </LinkContainer>
                            </Nav>
                        </div>
                    </div>
                </Col>
                <Col sm={9} className="content">
                    {/* Main content goes here */}
                    <h3 className='head text-white '>Post Job</h3>
                    <div className='form_div '>

                        <Form>
                            <Form.Group className='form_group' >
                                <Form.Control className='my-4 job_input '
                                    type='text'
                                    placeholder='Company Name'
                                >
                                </Form.Control>
                                <Form.Control className='my-4 job_input'
                                    type='text'
                                    placeholder='Experience/Fresher '
                                >
                                </Form.Control>
                                <Form.Control className='my-4 job_input'
                                    type='text'
                                    placeholder='Salary'
                                >
                                </Form.Control>
                                <Form.Control className='my-4 job_input'
                                    type='text'
                                    placeholder='Job type'
                                >
                                </Form.Control>
                                <Form.Control className='my-4 job_input'
                                    type='text'
                                    placeholder='Job location'
                                >
                                </Form.Control>
                                <Form.Control className='my-4 job_input'
                                    type='text'
                                    placeholder='Last apply date'
                                >
                                </Form.Control>
                                <Form.Control className='my-4 job_input'
                                    as='textarea'
                                    rows={5}
                                    placeholder='Requirements'
                                >
                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' className='addButton'>Save</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Job;
