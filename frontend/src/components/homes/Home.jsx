
import { useEffect, useState } from 'react';
import './Home.css';
import { usersApi } from '../../axiosApi/axiosInstance';
import {  Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {

  const [allCategories, setAllCategories] = useState([])

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await usersApi.get('users/categories')
      console.log(res.data);
      setAllCategories(res.data)
    }
    fetchCategory()
  },[])

  console.log();
  return (
    <div>
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
  );
};

export default Home;
