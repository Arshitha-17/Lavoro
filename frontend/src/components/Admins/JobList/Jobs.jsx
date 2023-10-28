import { Container, Row, Col } from 'react-bootstrap';
import HrProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg'; // Replace with the actual image path
import { AiOutlineUser, AiOutlineMessage, AiOutlineUnorderedList, } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdLogout, MdWorkOutline } from 'react-icons/md'
import { NavLink } from 'react-router-dom';
import './Jobs.css'
import { useEffect, useState } from 'react';
import { usersApi } from '../../../axiosApi/axiosInstance';
import { toast } from 'react-toastify';

const Job = () => {
    const [jobs, setJobs] = useState([])

    const deleteJob =async (jobId)=>{
        const res = await usersApi.delete(`admin/jobList/${jobId}`)
        if(res.data.message){
            toast.success(res.data.message)
            setJobs(true)
        }else{
            toast.error("error occured")
        }
    }

    useEffect(() => {
        const fetchJob = async () => {
            let res = await usersApi.get('admin/jobList')
            console.log(res.data);
            setJobs(res.data.jobs)
        }
        fetchJob()
    }, [])

    return (
        <>
        
        <Container fluid>
            <Row>
                <Col className="sidebar m-4">

                    <div className='sidebar-Content'>
                        <div className="HrProfileImage">
                            <img src={HrProfileImage} alt="User Profile" className="hr-profile-image" />
                            <h2>Name</h2>
                        </div>
                        <div className='sidebar-headings'>
                            {/* <div className='heads'>
                                <div><AiOutlineUser /> </div>
                                <NavLink to="/admin/profile" className='head'>Profile</NavLink>
                            </div> */}
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
                    <h3 className='mainHead' >List Job Post</h3>
                    <div className='mainDiv'>
                        {
                            jobs.length>0 ? (
                                jobs.map((job,index)=>(
                                    <div className='subdiv my-2 rounded' key={index}> 
                                        <h5 className='mainheads'>{job.companyName}</h5>
                                        <div className='subheads '>
                                            <h6 className='sub' >{job.jobRole} </h6>
                                            <h6 className='sub'>{job.jobType} </h6>
                                            <h6 className='sub'>{job.jobLocation} </h6>
                                            <h6 className='sub'>{job.salary} </h6>
                                            <h6 className='sub'>{job.experience} </h6>
                                            {/* <button className='delete' onClick={()=>deleteJob(job._id)} >Delete</button> */}
                                        </div>
                                    </div>
                                ))
                            ):null
                        }
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    );
};
export default Job;
