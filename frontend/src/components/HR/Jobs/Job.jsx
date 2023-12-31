import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Form, Button } from 'react-bootstrap';
import './Job.css'; // Import your CSS file
import { NavLink, useNavigate } from 'react-router-dom';
import HrProfileImage from './Untitled.jpeg'; 
import { AiOutlineUser, AiOutlineMessage, AiOutlineUnorderedList, } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdLogout, MdWorkOutline } from 'react-icons/md'
import { usersApi } from '../../../axiosApi/axiosInstance';
import { toast } from 'react-toastify';


const Job = () => {

    const [companyName, setCompanyName] = useState('');
    const [hrData, setHrDetails] = useState({});
    const [jobRole, setJobRole] = useState('');
    const [experience, setExperience] = useState('');
    const [salary, setSalary] = useState('');
    const [jobType, setJobType] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [requirements, setRequirements] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [qualification, setQualification] = useState('');
    const [allCategories, setAllCategories] = useState([]);
    const navigate = useNavigate();

    // last date
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = (today.getMonth() + 1).toString();

        if (month.length === 1) {
            month = '0' + month;
        }
        let day = today.getDate().toString();
        if (day.length === 1) {
            day = '0' + day;
        }
        return `${year}-${month}-${day}`;
    };

    const [lastDate, setLastDate] = useState(getCurrentDate());

    // Check if HR is logged in
    const hr = JSON.parse(localStorage.getItem('HRInfo'));

    useEffect(() => {
        if (!hr) {
            navigate('/hr/login');
        }
    }, [navigate, hr]);

    const hrId = hr ? hr._id : null;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (
            !companyName ||
            !jobRole ||
            !experience ||
            !salary ||
            !jobType ||
            !jobLocation ||
            !lastDate ||
            !requirements ||
            !jobDescription ||
            !qualification
        ) {
            toast.error('All fields are required');
            return;
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
            jobDescription,
            qualification,
            hrId,
        };

        try {
            const res = await usersApi.post('hr/HrJobAdd', jobData);

            if (res.status === 200) {
                toast.success(res.data.message);
                setJobRole('');
                setExperience('');
                setJobLocation('');
                setJobType('');
                setSalary('');
                setJobDescription('');
                setQualification('');
                setLastDate(getCurrentDate());
                setRequirements('');
            }
        } catch (error) {
            console.error('Error saving job:', error);
        }
    };

    useEffect(() => {
        const fetchHr = async () => {
            const res = await usersApi.get(`hr/getHrDetails/${hr._id}`);
            setHrDetails(res.data.hrDetails);
            setCompanyName(res.data.hrDetails.companyName);
        };
        fetchHr();
    }, [hr]);

    useEffect(() => {
        const fetchCategories = async () => {
            if (hr) {
                const res = await usersApi.get('hr/getCategories');
                setAllCategories(res.data);
            }
        };
        fetchCategories();
    }, [hr]);


    useEffect(() => {
        const fetchCategories = async () => {
            if (hr) {
                const res = await usersApi.get('hr/getCategories');
                setAllCategories(res.data);
            }
        };
        fetchCategories();
    }, [hr]);





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
                                <NavLink to="/hr/chats" className='head'>Message</NavLink>
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
                    <h3 className="head text-white">Post Job</h3>
                    <div className="form_div">
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="form_group">
                                <Form.Control
                                    className="my-4 job_input"
                                    type="text"
                                    value={companyName}
                                    disabled
                                />
                                <Form.Control
                                    as="select"
                                    className="my-4 job_input"
                                    name="jobRole"
                                    value={jobRole}
                                    onChange={(e) => setJobRole(e.target.value)}
                                >
                                    <option disabled hidden value="">
                                        Select a Job Role
                                    </option>
                                    {allCategories.length > 0 ? (
                                        allCategories.map((category, index) => (
                                            <option key={index} value={category.categoryName}>
                                                {category.categoryName}
                                            </option>
                                        ))
                                    ) : null}
                                </Form.Control>
                                <Form.Control
                                    className="my-4 job_input"
                                    type="text"
                                    name="experience"
                                    value={experience}
                                    placeholder="Experience/Fresher"
                                    onChange={(e) => setExperience(e.target.value)}
                                />
                                <Form.Control
                                    className="my-4 job_input"
                                    type="text"
                                    name="salary"
                                    value={salary}
                                    placeholder="Salary"
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                                <Form.Control
                                    className="my-4 job_input"
                                    type="text"
                                    name="qualification"
                                    value={qualification}
                                    placeholder="Qualification"
                                    onChange={(e) => setQualification(e.target.value)}
                                />
                                <Form.Control
                                    className="my-4 job_input"
                                    type="text"
                                    name="jobType"
                                    value={jobType}
                                    placeholder="Job type"
                                    onChange={(e) => setJobType(e.target.value)}
                                />
                                <Form.Control
                                    className="my-4 job_input"
                                    type="text"
                                    name="jobLocation"
                                    value={jobLocation}
                                    placeholder="Job location"
                                    onChange={(e) => setJobLocation(e.target.value)}
                                />
                                <Form.Control
                                    className="my-4 job_input"
                                    type="date"
                                    name="lastDate"
                                    value={lastDate}
                                    onChange={(e) => setLastDate(e.target.value)}
                                    min={getCurrentDate()}
                                />
                                <Form.Control
                                    className="my-4 job_input"
                                    as="textarea"
                                    rows={3}
                                    name="requirements"
                                    value={requirements}
                                    placeholder="Requirements"
                                    onChange={(e) => setRequirements(e.target.value)}
                                />
                                <Form.Control
                                    className="my-4 job_input"
                                    as="textarea"
                                    rows={5}
                                    name="jobDescription"
                                    value={jobDescription}
                                    placeholder="Job Description"
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </Form.Group>
                            <Button type="submit" className="addButton">
                                Save
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
export default Job;
