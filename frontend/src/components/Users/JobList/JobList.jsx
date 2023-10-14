import React from 'react'
import './JobList.css'
import { Col, Container, Row } from 'react-bootstrap'
import {BsSave} from "react-icons/bs"

const JobList = () => {


  return (
    <div>
      <div className='firstDiv'> 
        <div className='headings'>
          <h1 className='mainhead' >Job Listing</h1>
          <h5 className='subhead' >Delivering Rapid Solutions with Lasting Impression.</h5>
        </div>
        <div className='searchbar '>
          <form className="form-inline my-2 my-lg-0">
            <div className=" input-group">
              <input type="text" className="input form-control" placeholder="Your job title or keyword" />
              <div className="input-group-append">
                <button className="button btn " type="button">Search</button>
              </div>
            </div>
          </form>
        </div>
        <div className='cardMain'>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
      <div className='jobListDiv' >
        <div>
          <h5 className='filterhead text-white' >Filter</h5>
        </div>
        <div className='contents' >
          <Container fluid>
            <Row>
              <Col className="sidebar m-4">
                <div className='maindiv'>
                  <div>
                    <h6>Location</h6>
                    <input className='locationInput' onChange={(e) => console.log(e.target.value)} type="text" placeholder='Type location' />
                  </div>
                  <hr />
                  <div>
                    <div>
                      <h6>Job Type</h6>
                    </div>
                    <div className='contentDiv'>
                      <p>Fulltime</p>
                      <input type="checkbox" className=" form-check-input" id="check2" name="option2" value="something" />
                    </div>
                    <div className='contentDiv'>
                      <p>Part time</p>
                      <input type="checkbox" className="form-check-input" id="check2" name="option2" value="something" />
                    </div>
                    <div className='contentDiv'>
                      <p>Freelance</p>
                      <input type="checkbox" className="form-check-input" id="check2" name="option2" value="something" />
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div >
                      <h6>Category</h6>
                    </div>
                    <div className='contentDiv'>
                      <p>Full satck developer</p>
                      <input type="checkbox" className="form-check-input" id="check2" name="option2" value="something" />
                    </div>
                    <div className='contentDiv'>
                      <p>UI/UX designer</p>
                      <input type="checkbox" className="form-check-input" id="check2" name="option2" value="something" />
                    </div>
                    <div className='contentDiv'>
                      <p>Business associate </p>
                      <input type="checkbox" className="form-check-input" id="check2" name="option2" value="something" />
                    </div>
                    <div className='contentDiv'>
                      <p>Accountant </p>
                      <input type="checkbox" className="form-check-input" id="check2" name="option2" value="something" />
                    </div>
                    <div className='contentDiv'>
                      <p>Video editor </p>
                      <input type="checkbox" className="form-check-input" id="check2" name="option2" value="something" />
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={9} className="content">
                <h3 className='mainHead' >List Job Post</h3>
                <div className='mainDiv'>
                  <div className='subdiv my-2 rounded' >
                    <h5 className='mainheads'>Company Name</h5>
                    <div className='subheads '>
                      <h6 className='sub' >Job role </h6>
                      <h6 className='sub'> job type</h6>
                      <h6 className='sub'>location</h6>
                      <h6 className='sub'>Salary </h6>
                      <div className='saveIcon'>
                      <BsSave/>
                      </div>
                      <button className='delete'  >Apply</button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default JobList
