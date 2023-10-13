import React from 'react'
import './JobList.css'
const JobList = () => {
  return (
    <div>
      <div>
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
      </div>
    </div>
  )
}

export default JobList
