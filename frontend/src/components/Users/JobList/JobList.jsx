import React, { useEffect, useState } from 'react'
import './JobList.css'
import { Col, Container, Row } from 'react-bootstrap'
import { BsSave } from "react-icons/bs"
import { Link, useNavigate } from 'react-router-dom'
import { usersApi } from '../../../axiosApi/axiosInstance'
import categoryImg from "/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.avif"


const JobList = () => {
  const [categories, setCategories] = useState([])
  const [jobs, setJobs] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [filteredJobs,setFilteredJobs] = useState([])

  const navigate = useNavigate()

  const [options, setOptions] = useState([
    { id: 1, label: 'Full Time', value: false },
    { id: 2, label: 'Part time', value: false },
    { id: 3, label: 'Freelance', value: false },
  ]);

  const handleTypeCheckboxChange = (id) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, value: !option.value } : option
      )
    );
  };

  const handleCategoryCheck = (_id) => {
    console.log(_id);
    setCategories((prevOption) =>
      prevOption.map((categories) =>
        categories._id === _id ? { ...categories, checked: !categories.checked } : categories
      )
    );
  };

  const filterHandler = (e) => {
    e.preventDefault();
    const filteredJobs = jobs.filter((job) => {
      const locationMatchs = locationFilter ? job.jobLocation.includes(locationFilter) : true;
      // Check location filter
      const locationMatch = locationFilter === '' || job.jobLocation === locationFilter;
  
      // Check job type filter
      const jobTypeMatch = options.some((option) => option.value && option.label === job.jobType);
  
      // Check category filter
      const categoryMatch = categories.some((category) => category.checked && category.categoryName === job.jobRole);

      // Return true if all criteria are met
      return locationMatch && jobTypeMatch && categoryMatch || locationMatchs;
    });

  
    // Update the state with filtered jobs
    setFilteredJobs(filteredJobs);
  
    console.log(filteredJobs);
    console.log("Filter handler");
  };
  // category 
  useEffect(() => {
    const fetchCategory = async () => {
      let res = await usersApi.get('users/categories')
      console.log(res.data);
      let newCategories = []
      for(let i=0;i<res.data.length;i++){
        res.data[i].checked=false
        newCategories.push(res.data[i])
      }
      setCategories(newCategories)
      console.log(newCategories);
    }
    fetchCategory()
  }, [])

  useEffect(() => {
    const fetchJobs = async () => {
      let res = await usersApi.get('users/jobList')
      setJobs(res.data.jobs)
    }
    fetchJobs()


  }, [])

  // const filteredJobs = jobs.filter((job) => {
  //   const locationMatch = locationFilter ? job.jobLocation.includes(locationFilter) : true;
  //   const checkboxMatch = checkboxChecked ? job.jobType === 'your-checkbox-value' : true;

  //   return locationMatch && checkboxMatch;
  // });

  return (
    <div >
      <div className='heightTag'></div>
      <div className='firstDives'>
        <div className='headings'>
          <h1 className='mainhead' >Job Listing</h1>
          <h5 className='subhead' >Delivering Rapid Solutions with Lasting Impression.</h5>
        </div>
        <div className='searchbar '>
          <form className="form-inline my-2 my-lg-0">
            <div className=" input-group">
              <input
                type="text"
                className="input form-control"
                placeholder="Your job title or keyword"
                onChange={(e) => setLocationFilter(e.target.value)}
              />
              <div className="input-group-append">
                <button className="button btn " type="button">Search</button>
              </div>
            </div>
          </form>
        </div>
        {/* <div className="display-flex">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div className="cardMain" key={index}>
                <div className="card" style={{ width: '18rem' }}>
                  <img className="card-img-top" src={categoryImg} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">{category.categoryName}</h5>
                  </div>
                </div>
              </div>
            ))
          ) : null}
        </div> */}

      </div>
      <div className='jobListDiv' >
        <div>
          <h5 className='filterhead text-white' >Filter</h5>
        </div>
        <div className='contents' >
          <Container fluid>
            <Row>
              <Col className="sidebar m-4">

                <form onSubmit={filterHandler}>
                  <div className='maindiv'>
                    <div>
                      <h6>Location</h6>
                      <input
                        type="text"
                        className="locationInput input form-control"
                        placeholder="Type location"
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />

                    </div>
                    <hr />
                    <div>
                      <div>
                        <h6>Job Type</h6>
                      </div>
                      {options.map((option) => (
                       <div className='jobtype' >
                         <div className='jobDiv' key={option.id}>
                          <label>
                            {option.label}
                          </label>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={option.value}
                            onChange={() => handleTypeCheckboxChange(option.id)}
                          />
                        </div>
                       </div>
                      ))
                      }
                    </div>
                    <hr />
                    <div>
                      <div >
                        <h6>Category</h6>
                      </div>
                      {
                        categories.length > 0 ? (
                          categories.map((category, index) => (

                            <div className='contentDiv' key={index}>
                              <p>{category.categoryName} </p>
                              <input onChange={() => handleCategoryCheck(category._id)} type="checkbox" className="form-check-input" id="check2" name="option2" value="something" />
                            </div>
                          ))
                        ) : null
                      }
                      <button type='submit' className='filterBtn' >Apply Filter</button>
                    </div>
                  </div>
                </form>
              </Col>
              <Col sm={9} className="content">
                <h3 className='mainHead' >List Job Post</h3>
                <div className="mainDiv">
                  {
                    filteredJobs && filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
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
                          <button onClick={()=>{
                          navigate(`/jobDetails/${job._id}`)
                          }} className='delete'>Apply</button>
                        </div>
                      </div>
                    ))
                  ) : (jobs && jobs.length > 0)?(
                    jobs.map((job, index) => (
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
                          <button onClick={()=>{
                          navigate(`/jobDetails/${job._id}`)
                          }} className='delete'  >Apply</button>
                        </div>
                      </div>
                    ))
                  ):(
                    <p>No matching jobs found.</p>
                  )}
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
