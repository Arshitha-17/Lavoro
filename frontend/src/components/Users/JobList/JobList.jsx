import React, { useEffect, useState } from 'react'
import './JobList.css'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { BsSave } from "react-icons/bs"
import { Link, useNavigate } from 'react-router-dom'
import { usersApi } from '../../../axiosApi/axiosInstance'
import { toast } from "react-toastify"
import ReactPaginate from 'react-paginate';



const JobList = () => {
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false)

  const [currentPage, setCurrentPage] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);


  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"))
  useEffect(() => {
    if (!user) {

      navigate('/login')
    }
  })

  const filterHandler = (e) => {
    e.preventDefault();
    const filteredJobs = jobs.filter((job) => {
      const locationMatch = locationFilter
        ? job.jobLocation.includes(locationFilter)
        : true;
      const jobTypeMatch = jobTypeFilter === '' || job.jobType.includes(jobTypeFilter);
      const categoryMatch = categoryFilter === '' || job.jobRole.includes(categoryFilter);
      const companyMatch = companyFilter === '' || job.companyName.includes(companyFilter);
      return locationMatch && jobTypeMatch && categoryMatch && companyMatch;
    });

    setFilteredJobs(filteredJobs);
    setIsFilterApplied(true)
  };

  const removeFilterHandler = () => {

    setFilteredJobs([])
    setIsFilterApplied(false)
    setCategoryFilter("")
    setCompanyFilter("")
    setJobTypeFilter("")
    setLocationFilter("")

  };

  useEffect(() => {
    const fetchCategory = async () => {
      let res = await usersApi.get('users/categories');
      let newCategories = [];
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].checked = false;
        newCategories.push(res.data[i]);
      }
      setCategories(newCategories);
    };
    fetchCategory();
  }, []);


  useEffect(() => {
    const fetchJobs = async (page) => {
      let res = await usersApi.get(`users/jobList/${user._id}?page=${page}`);
      setJobs(res.data.jobs);
      setTotalJobs(res.data.totalJobs);
    };
    fetchJobs(currentPage + 1); 
  }, [currentPage]);





  const handleSaveJobs = async (jobId) => {
    try {
      const res = await usersApi.post(`users/saveJobs/${jobId}/${user._id}`)
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };


  return (
    <div >
      <div className='heightTag'></div>
      <div className='firstDives'>
        <div className='headings'>
          <h1 className='mainhead' >Job Listing</h1>
          <h5 className='subhead' >Delivering Rapid Solutions with Lasting Impression.</h5>
        </div>

        <div className='cardMainDivs '>
          {
            categories.length > 0 ? (
              categories.map((category, index) => (
                <Card className='cards' style={{ width: '14rem', height: '20rem' }} key={index} >
                  <Card.Img variant="top"
                    src={`https://www.lavoroo.site/images/${category.image}`}
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
      <div className="jobListDiv">
        <div>
          <h5 className="filterhead text-white">Filter</h5>
        </div>
        <div className="contents">
          <Container fluid>
            <Row>
              <Col className="sidebar m-4">
                <form onSubmit={filterHandler}>
                  <div className="maindiv">
                    <div>
                      <h6>Location</h6>
                      <input
                        type="text"
                        className="locationInput input form-control"
                        placeholder="Type location"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>
                    <hr />
                    <div>
                      <div>
                        <h6>Job Type</h6>
                        <select
                          className="form-select"
                          value={jobTypeFilter}
                          onChange={(e) => setJobTypeFilter(e.target.value)}
                        >
                          <option value="" disabled>Select Job Type</option>
                          <option value="Full Time">Full Time</option>
                          <option value="Part Time">Part Time</option>
                          <option value="Freelance">Freelance</option>
                        </select>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <div>
                        <h6>Job Role</h6>
                        <select
                          className="form-select"
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                          <option value="" disabled >Select Job Role</option>
                          {categories.map((category) => (
                            <option key={category._id} value={category.categoryName}>
                              {category.categoryName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <hr />
                      <div>
                        <div>
                          <h6>Company Name</h6>
                          <input
                            type="text"
                            className="locationInput input form-control"
                            placeholder="Type company "
                            value={companyFilter}
                            onChange={(e) => setCompanyFilter(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='filter'>
                        <div className='applyfilterbtn'>
                          <button type="submit" className="filterBtn">
                            Apply Filter
                          </button>
                        </div>
                        {isFilterApplied && (
                          <div className="removefilter">
                            <button type="button" className="removefilterBtn" onClick={removeFilterHandler}>
                              Remove Filter
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </form>
              </Col>
              <Col sm={9} className="content">
                <h3 className="mainHead">List Job Post</h3>
                <div className="mainDiv">
                  {filteredJobs && filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                      <div className="subdiv my-2 rounded" key={index}>
                        <h5 className="mainheads">{job.companyName}</h5>
                        <div className="subheads">
                          <h6 className="sub">{job.jobRole}</h6>
                          <h6 className="sub">{job.jobType}</h6>
                          <h6 className="sub">{job.jobLocation}</h6>
                          <h6 className="sub">{job.salary}</h6>
                          <div className="saveIcon">
                            <Link to="/saveJobs">
                              <BsSave className="icons" />
                            </Link>
                          </div>
                          <button
                            onClick={() => {
                              navigate(`/jobDetails/${job._id}`);
                            }}
                            className="delete"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    ))
                  ) : jobs && jobs.length > 0 ? (
                    jobs.map((job, index) => (
                      <div className="subdiv my-2 rounded" key={index}>
                        <h5 className="mainheads">{job.companyName}</h5>
                        <div className="subheads">
                          <h6 className="sub">{job.jobRole}</h6>
                          <h6 className="sub">{job.jobType}</h6>
                          <h6 className="sub">{job.jobLocation}</h6>
                          <h6 className="sub">{job.salary}</h6>
                          <div className="saveIcon">
                            <Link onClick={() => handleSaveJobs(job._id)} >
                              <BsSave className="icons" />
                            </Link>
                          </div>
                          <button
                            onClick={() => {
                              navigate(`/jobDetails/${job._id}`);
                            }}
                            className="delete"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No matching jobs found.</p>
                  )}
                </div>
                <div className="pagination-container right">
                  {totalJobs > 0 && (
                    <ReactPaginate
                      pageCount={Math.ceil(totalJobs / 5)} 
                      pageRangeDisplayed={5} 
                      marginPagesDisplayed={2} 
                      previousLabel={'<< Previous'}
                      nextLabel={'Next >>'}
                      breakLabel={'...'}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                    />
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
