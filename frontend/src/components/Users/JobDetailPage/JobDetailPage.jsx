import React, { useEffect, useState } from 'react'
import './JobDetailPage.css'
import { usersApi } from '../../../axiosApi/axiosInstance'
import { useParams } from 'react-router-dom';


const JobDetailPage = () => {

    const [jobDetail, setJobDetail] = useState({})

    const { jobId } = useParams();
   
    const user =  JSON.parse(localStorage.getItem('userInfo'))


    const submitHandler =async ()=>{
       const res = await usersApi.post(`users/jobDetails/${jobId}/${user._id}`)
    }

    useEffect(() => {
        const fetchJob = async () => {
            const res = await usersApi.get(`users/jobDetails/${jobId}`)
            console.log(res.data);
            setJobDetail(res.data)
        }
        fetchJob()

    }, [])



    return (
        <div>
            <div className='header text-white'>
                <h1>Job Details</h1>
                <h5>Here will be your company job details & requirements</h5>
            </div>

            <div>
                <p className=' p-3 text-white' >{jobDetail.createdAt ?jobDetail.createdAt.slice(0, 10):jobDetail.createdAt }   by {jobDetail.companyName} </p>
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
                   <p>{jobDetail.lastDate?jobDetail.lastDate.slice(0, 10):jobDetail.lastDate} </p>
                   </div>
                   <div>
                   <p>{jobDetail.jobType} </p>
                   </div>
                   <div>
                   </div>
                    </div>
                    </div>
                    <div className='applybtnDiv'>
                        <button className='applybtn' onClick={submitHandler}  >Apply</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default JobDetailPage
