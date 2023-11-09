
import { useEffect, useState } from 'react';
import './Home.css';
import { usersApi } from '../../../axiosApi/axiosInstance';
import { Card, Col, NavLink, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import logoImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/WhatsApp Image 2023-09-26 at 8.21.43 PM-PhotoRoom.png-PhotoRoom.png';
import image1 from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg';
import image2 from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/young-bearded-man-with-striped-shirt.jpg';
import image3 from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/portrait-happy-woman-with-digital-tablet.jpg';
import userImg from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/3d-render-todo-check-list-with-ticks-task-test_107791-15401-removebg-preview.png';
import profileImg from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/illustration-user-avatar-icon_53876-5907-removebg-preview-removebg-preview.png';
import teamImg from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/illustration-business-team-structure_53876-5881-removebg-preview.png';
const HrHome = () => {

  const [allCategories, setAllCategories] = useState([])


  useEffect(() => {
    const fetchCategory = async () => {
      const res = await usersApi.get('hr/getCategories')
      setAllCategories(res.data)
    }
    fetchCategory()
  }, [])




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
                      src={`https://www.lavoroo.site/images/${category.image}`}
                    />
                    <Card.Body>
                      <Link className='TitleLink' to="/hr/jobList">
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

      <div className='secondDiv'>
        
          <h4  className='secondDivHeader'>How Lavoro Work</h4>
     
        <div className='divContainer'>

        <div className='accountDiv'>
          <img className='img' src={profileImg} alt="Small Image" />
          <h6>Create Account</h6>
          <p>It's very easy to open an account and start your journey.</p>
        </div>
        <div className='profileDiv'>
          <img className='img' src={userImg} alt="Small Image" />
          <h6>Complete your profile</h6>
          <p>It's very easy to open an account and start your journey.</p>
        </div>
        <div className='teamDiv'>
          <img className='img' src={teamImg} alt="Small Image" />
          <h6>Build your team</h6>
          <p>It's very easy to open an account and start your journey.</p>
        </div>
        </div>


      </div>
      {/* 3rd div */}
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

export default HrHome;
