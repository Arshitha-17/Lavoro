import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineMessage, AiOutlineUnorderedList } from 'react-icons/ai';
import { MdLogout, MdWorkOutline } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io'
import { NavLink } from 'react-router-dom';
import HrProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg';
import "./HrProfile.css"
import { usersApi } from '../../../axiosApi/axiosInstance';
import { toast } from 'react-toastify'


const HrProfile = () => {
    const [hrDetails, setHrDetails] = useState({});
    const [editedDetails, setEditedDetails] = useState({
        name: "",
        email: "",
        companyName: "",
        companyAddress: "",
        description: ""
    });


    useEffect(() => {
        let hr = JSON.parse(localStorage.getItem('HRInfo'));
        if (hr && hr._id) {
            const fetchHr = async () => {
                try {
                    const res = await usersApi.get(`/hr/HrProfile/${hr._id}`);
                    setHrDetails(res.data);
                    // Set the initial state for editedDetails
                    setEditedDetails({
                        name: res.data.name,
                        email: res.data.email,
                        companyName: res.data.companyName,
                        companyAddress: res.data.companyAddress,
                        description: res.data.description,
                    });
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            };
            fetchHr();
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedDetails({ ...editedDetails, [name]: value });
    };

    const handleSave = async () => {
        try {
            const hr = JSON.parse(localStorage.getItem('HRInfo'));

            // Create an object with the data you want to send
            const data = {
                name: editedDetails.name,
                email: editedDetails.email,
                companyName: editedDetails.companyName,
                companyAddress: editedDetails.companyAddress,
                description: editedDetails.description,
            };

            // Send the data as a JSON object
            const updatedHr = await usersApi.put(`/hr/HrProfile/${hr._id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setHrDetails(updatedHr.data);
            toast.success('Profile Updated Successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

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
                            <h3 className='head text-white '>My Profile</h3>
                            <div className='formDiv'>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label className='fields' >Name</Form.Label>
                                        <Form.Control type="text" name="name" value={editedDetails.name} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className='fields'>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={editedDetails.email} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicQualification">
                                        <Form.Label className='fields'>Company name</Form.Label>
                                        <Form.Control type="text" name="companyName" value={editedDetails.companyName} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicExperience">
                                        <Form.Label className='fields'>Company address</Form.Label>
                                        <Form.Control type="text" name="companyAddress" value={editedDetails.companyAddress} onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicBio">
                                        <Form.Label className='fields'>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} name="description" value={editedDetails.description} onChange={handleInputChange} />
                                    </Form.Group>

                                    <Button variant="primary" onClick={handleSave}>
                                        Save
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HrProfile;
