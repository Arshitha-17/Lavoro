import React, { useEffect, useState } from 'react'
import './JobDetailPage.css'
import { usersApi } from '../../../axiosApi/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify"

const setAppliedStatusInLocalStorage = (jobId, status) => {
    localStorage.setItem(`jobApplied_${jobId}`, status.toString());
};

const getAppliedStatusFromLocalStorage = (jobId) => {
    return localStorage.getItem(`jobApplied_${jobId}`) === 'true';
};

const JobDetailPage = () => {
    const [jobDetail, setJobDetail] = useState({});
    const [applied, setApplied] = useState(false);

    const navigate = useNavigate();
    const { jobId } = useParams();
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const checkApplicationStatus = async () => {
        if (user) {
            const response = await usersApi.post(`users/checkApplicationStatus/${jobId}/${user._id}`);
            const appliedStatus = response.data.applied;

            // Set the applied status in local storage
            setAppliedStatusInLocalStorage(jobId, appliedStatus);

            setApplied(appliedStatus);
        }
    };

    const submitHandler = async () => {
        if (!user) {
            navigate('/login');
        }

        if (!applied) {
            const res = await usersApi.post(`users/jobDetails/${jobId}/${user._id}`);
            toast.success(res.data.message);
            setApplied(true);

            // Set the applied status in local storage
            setAppliedStatusInLocalStorage(jobId, true);
        }
    };

    useEffect(() => {
        const fetchJob = async () => {
            const res = await usersApi.get(`users/jobDetails/${jobId}`);
            setJobDetail(res.data);
        };
        fetchJob();

        // Check the application status when the page loads
        checkApplicationStatus();
    }, [jobId]);

    useEffect(() => {
        // If the user has applied, set the "Applied" status
        const appliedFromLocalStorage = getAppliedStatusFromLocalStorage(jobId);
        if (appliedFromLocalStorage) {
            setApplied(true);
        }
    }, [jobId]);


    return (
        <div>
            <div className='header text-white'>
                <h1>Job Details</h1>
                <h5>Here will be your company job details & requirements</h5>
            </div>

            <div>
                <p className=' p-3 text-white' >{jobDetail.createdAt ? jobDetail.createdAt.slice(0, 10) : jobDetail.createdAt}   by {jobDetail.companyName} </p>
            </div>
            <div className='firstDiv' >
                <div className='jobDetailDiv1'>
                    <h4>{jobDetail.jobRole} </h4>
                    <p>Location: {jobDetail.jobLocation} </p>
                    <p>Job Description: {jobDetail.jobDescription} </p>
                </div>
                <div className='jobDetailDiv2'>
                    <h4>Requirements:</h4>
                    <p>{jobDetail.requirements} </p>
                </div>
            </div>
            {/* 2nd */}
            <div className='sencondDiv'>
                <div className='jobDetailDiv3'>
                    <h4>Qualification</h4>
                    <p>{jobDetail.qualification} </p>
                </div>
                <div className='jobDetailDiv4'>
                    <div className='compName'>
                        <h3 >{jobDetail.companyName} </h3>
                    </div>
                    <div className='subheaders display-flex'>
                        <div className='px-4' >
                            <div className='jobSubdetails' >
                                <p  >Job Role</p>
                            </div>
                            <div className='jobSubdetails'>
                                <p  >Salary</p>
                            </div>
                            <div className='jobSubdetails'>
                                <p > Location </p>
                            </div>
                            <div className='jobSubdetails'>
                                <p >Experience </p>
                            </div>
                            <div className='jobSubdetails'>
                                <p >Last date</p>
                            </div>
                            <div className='jobSubdetails'>
                                <p >Job type</p>
                            </div>
                        </div>
                        <div className=''>
                            <div>
                                <p >{jobDetail.jobRole} </p>
                            </div>
                            <div>
                                <p >{jobDetail.salary} </p>
                            </div>
                            <div>
                                <p>{jobDetail.jobLocation}  </p>
                            </div>
                            <div>
                                <p>{jobDetail.experience} </p>
                            </div>
                            <div>
                                <p>{jobDetail.lastDate ? jobDetail.lastDate.slice(0, 10) : jobDetail.lastDate} </p>
                            </div>
                            <div>
                                <p>{jobDetail.jobType} </p>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                    <div className='applybtnDiv'>
                        <button className='applybtn' onClick={submitHandler} disabled={applied}>
                            {applied ? 'Applied' : 'Apply'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default JobDetailPage
