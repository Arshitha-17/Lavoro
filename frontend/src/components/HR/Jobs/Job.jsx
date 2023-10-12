import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Form, Button } from 'react-bootstrap';
import './Job.css'; // Import your CSS file
import { LinkContainer } from 'react-router-bootstrap';
import HrProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg'; // Replace with the actual image path
import { AiOutlineUser, AiOutlineMessage, AiOutlineUnorderedList, } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdLogout, MdWorkOutline } from 'react-icons/md'
import { usersApi } from '../../../axiosApi/axiosInstance';
import { toast } from 'react-toastify';


const Job = () => {
    const [companyName, setCompanyName] = useState('')
    const [jobRole, setJobRole] = useState('')
    const [experience, setExperience] = useState('')
    const [salary, setSalary] = useState('')
    const [jobType, setJobType] = useState('')
    const [jobLocation, setJobLocation] = useState('')
    const [lastDate, setLastDate] = useState('')
    const [requirements, setRequirements] = useState('')
    const [allCategories, setAllCategories] = useState([])

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log("saved"); 
        if(!companyName ||! jobRole||! experience||! salary|| !jobType|| !jobLocation || !lastDate||!requirements){
            toast.error('All field are required')
            return
        }
        const jobData = {
            companyName,
            jobRole,
            experience,
            salary,
            jobType,
            jobLocation,
            lastDate,
            requirements,
        };
    try {
        const res= await usersApi.post('hr/HrJobAdd',jobData)
      if(res.status===200){
        console.log(res);
        toast.success(res.data.message)
        setAllCategories('')
        setCompanyName('')
        setExperience('')
        setJobLocation('')
        setJobType('')
        setJobRole('')
        setLastDate('')
        setRequirements('')
        setSalary('')
      }

    } catch (error) {
        console.error('Error saving job:', error);
    }

    }


    useEffect(() => {
        const fetchCategories = async () => {
            let res = await usersApi.get('hr/getCategories')
            console.log(res.data);
            setAllCategories(res.data)
        }
        fetchCategories()
    }, [])
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

                        <Form onSubmit={submitHandler}>
                            <Form.Group className='form_group' >
                                <Form.Control className='my-4 job_input '
                                    type='text'
                                    value={companyName}
                                    placeholder='Company Name'
                                    onChange={(e) => setCompanyName(e.target.value)}
                                >
                                </Form.Control>
                                <Form.Control
                                    as="select"
                                    className="my-4 job_input"
                                    name="jobRole"
                                    value={jobRole}
                                    onChange={(e) => setJobRole(e.target.value)}
                                >
                                    <option disabled hidden value="">Select a Job Role</option>
                                    {
                                        allCategories.length>0 ? (
                                            allCategories.map((category,index)=>(
                                                <option key={index} value={category.categoryName}>{category.categoryName}</option>
                                            ))
                                        ):null 
                                    }
                                    
                                </Form.Control>

                                <Form.Control className='my-4 job_input'
                                    type='text'
                                    value={experience}
                                    placeholder='Experience/Fresher '
                                    onChange={(e) => setExperience(e.target.value)}
                                >
                                </Form.Control>
                                <Form.Control className='my-4 job_input'
                                    type='text'
                                    value={salary}
                                    placeholder='Salary'
                                    onChange={(e) => setSalary(e.target.value)}
                                >
                                </Form.Control>
                                <Form.Control className='my-4 job_input'
                                    type='text'
                                    value={jobType}
                                    placeholder='Job type'
                                    onChange={(e) => setJobType(e.target.value)}
                                >
                                </Form.Control>
                                <Form.Control className='my-4 job_input'
                                    type='text'
                                    value={jobLocation}
                                    placeholder='Job location'
                                    onChange={(e) => setJobLocation(e.target.value)}
                                >
                                </Form.Control>
                                <Form.Control className='my-4 job_input'
                                    type='date'
                                    value={lastDate}
                                    placeholder='Last apply date'
                                    onChange={(e) => setLastDate(e.target.value)}
                                >
                                </Form.Control>
                                <Form.Control className='my-4 job_input'
                                    as='textarea'
                                    rows={5}
                                    value={requirements}
                                    placeholder='Requirements'
                                    onChange={(e) => setRequirements(e.target.value)}
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
