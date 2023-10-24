
import { useEffect, useState } from 'react';
import './Home.css';
import { usersApi } from '../../axiosApi/axiosInstance';
import { Card, NavLink } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsSave } from "react-icons/bs"
const Home = () => {

  const [allCategories, setAllCategories] = useState([])
  const [jobs, setJobs] = useState([])
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 4; 

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await usersApi.get('users/categories')
      setAllCategories(res.data)
    }
    fetchCategory()
  }, [])


  useEffect(() => {
    const fetchJobs = async () => {
      const res = await usersApi.get('users/jobList')
      setJobs(res.data.jobs)
    }
    fetchJobs()
  }, [])

    // Function to handle pagination
    const paginateJobs = (page) => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return jobs.slice(startIndex, endIndex);
    }
  

  return (
    <>
      <div className='maindiv' >
        <div className='homeHeadDiv'>
          <h1 >Discover Your Next Opportunity with Us</h1>
          <h5>Navigating Careers, Finding Success</h5>
        </div>

        <div>
          <div className='cardMainDivs '>
            {
              allCategories.length > 0 ? (
                allCategories.map((category, index) => (
                  <Card className='cards' style={{ width: '14rem', height: '20rem' }} key={index} >
                    <Card.Img variant="top"
                      src={`http://localhost:5000/images/${category.image}`}
                    />
                    <Card.Body>
                      <Link className='TitleLink' to="/jobList">
                        <Card.Title className='cardTitle'>{category.categoryName} </Card.Title>
                      </Link>
                    </Card.Body>
                  </Card>
                ))
              ) : null
            }
          </div>
        </div>
      </div>
      {/* 2nd div */}
      <div className='jobListDivs'>
        <div className='listdiv'>
          <h6>Latest Job Listing: </h6>
        </div>
        <div className="mainDiv">
          {
            // Use the paginated jobs
            paginateJobs(currentPage).map((job, index) => (
              <div className='subdiv my-2 rounded' key={index}>
                <h5 className='mainheads'>{job.companyName} </h5>
                <div className='subheads '>
                  <h6 className='sub' >{job.jobRole} </h6>
                  <h6 className='sub'>{job.jobType} </h6>
                  <h6 className='sub'>{job.jobLocation} </h6>
                  <h6 className='sub'>{job.salary} </h6>
                  <div className='saveIcon'>
                    <Link to='/saveJobs' >
                      <BsSave className='icons' />
                    </Link>
                  </div>
                  <button onClick={() => {
                    navigate(`/jobDetails/${job._id}`)
                  }} className='delete'  >Apply</button>
                </div>
              </div>
            ))
          }
          <NavLink className='viewMore'>
            <Link className='viewMoreLink' to="/jobList">
              View more...
            </Link>
          </NavLink>
        </div>

      </div>
    </>

  );
};

export default Home;
