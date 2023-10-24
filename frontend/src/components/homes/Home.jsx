
import { useEffect, useState } from 'react';
import './Home.css';
import { usersApi } from '../../axiosApi/axiosInstance';
import { Card, Col, NavLink, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsSave } from "react-icons/bs"
import logoImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/WhatsApp Image 2023-09-26 at 8.21.43 PM-PhotoRoom.png-PhotoRoom.png'; 
import image1 from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg';
import image2 from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/young-bearded-man-with-striped-shirt.jpg';
import image3 from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/portrait-happy-woman-with-digital-tablet.jpg';
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
      <div className='thirdMainDiv' >

        <Row >

          <div className='headDiv' >
            <h5 className='pt-3'>Why choose us? </h5>
            <h5>World of talent at your fingertips</h5>
          </div>
          <div className='mainheadDiv'>
            <p className='headerDiv'>Get over 71.000+ talented experts in lavoro.</p>
          </div>
          <Col sm={6} >

            <div className='imgDiv1'>
              <img className='img1' src={image1} alt="Small Image" />
            </div>
            <div className='imgDivMain'>
              <div className='imgDiv2'>
                <img className='img2' src={image2} alt="Small Image" />
              </div>
              <div >
                <img className='img3' src={image3} alt="Small Image" />
              </div>
            </div>
          </Col>
          <Col className='col' sm={6}>
            <div className='Coldiv'>
              <div className='div4' >
                <h5>Seamless Chat Interviews</h5>
                <p>At Lavoro, we specialize in offering cutting-edge chat interview services. We understand the importance of effective communication and the pivotal role it plays in the success of any organization. Our expert team is dedicated to helping you stand out in the digital landscape by providing tailored chat interviews that showcase your unique story. Whether you're a job seeker looking to ace your next interview or an employer seeking to connect with top talent, our chat interview services are designed to streamline the process and deliver exceptional results.   </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className='footerMainDiv'>
        <div>
          <h5>India's No.1 job portal.</h5>
        </div>
        <div>
        <img style={{ paddingLeft: '15px' }}
                src={logoImage}
                alt='Logo'
                width='150' 
                height='50'
                className='d-inline-block align-top' 
              />
        </div>
      </div>
    </>
  );
};

export default Home;
