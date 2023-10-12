import { Container, Row, Col, Nav, Form, Button } from 'react-bootstrap';
import HrProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg'; // Replace with the actual image path
import { AiOutlineUser, AiOutlineMessage, AiOutlineUnorderedList, } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdLogout, MdWorkOutline } from 'react-icons/md'
import { NavLink } from 'react-router-dom';
import './JobList.css'

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
                                <NavLink to="/hr/JobList"className='head'>List Job</NavLink>
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

                </Col>
            </Row>
        </Container>
    );
};
export default Job;
