import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineMessage, AiOutlineUnorderedList } from 'react-icons/ai';
import { MdLogout, MdWorkOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import UserProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg';
import "./Profile.css"
import { usersApi } from '../../../axiosApi/axiosInstance';
import { toast } from 'react-toastify'


const Profile = () => {
    const [userDetails, setUserDetails] = useState({});
    const [editedDetails, setEditedDetails] = useState({});
    const [resumeFile, setResumeFile] = useState(null);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("userInfo"));
        if (user && user._id) {
            const fetchUser = async () => {
                try {
                    const res = await usersApi.get(`/users/profile/${user._id}`);
                    setUserDetails(res.data);

                    // Set the initial state for editedDetails
                    setEditedDetails({
                        name: res.data.name,
                        email: res.data.email,
                        qualification: res.data.qualification,
                        experience: res.data.experience,
                        skills: res.data.skills,
                        bio: res.data.bio
                    });
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            };
            fetchUser();
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setResumeFile(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedDetails({ ...editedDetails, [name]: value });

    };

    const handleSave = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("userInfo"));
            const formData = new FormData();

            formData.append("name", editedDetails.name);
            formData.append("email", editedDetails.email);
            formData.append("qualification", editedDetails.qualification);
            formData.append("experience", editedDetails.experience);
            formData.append("skills", editedDetails.skills);
            formData.append("bio", editedDetails.bio);

            // Check if a resume file is selected and append it to the form data
            if (resumeFile) {
                formData.append("resume", resumeFile);
            }

            const updatedUser = await usersApi.put(`/users/profile/${user._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setUserDetails(updatedUser.data);
            toast.success("Profile Update Successfully");

        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };




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
                                        <Form.Label className='fields'>Qualification</Form.Label>
                                        <Form.Control type="text" name="qualification" value={editedDetails.qualification} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicExperience">
                                        <Form.Label className='fields'>Experience</Form.Label>
                                        <Form.Control type="text" name="experience" value={editedDetails.experience} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicSkills">
                                        <Form.Label className='fields'>Skills</Form.Label>
                                        <Form.Control type="text" name="skills" value={editedDetails.skills} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicBio">
                                        <Form.Label className='fields'>Bio</Form.Label>
                                        <Form.Control as="textarea" rows={3} name="bio" value={editedDetails.bio} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicResume">
                                        <Form.Label className='fields'>Upload Resume (PDF)</Form.Label>
                                        <Form.Control type="file" name="resume" accept=".pdf" onChange={handleFileChange} />
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

export default Profile;
