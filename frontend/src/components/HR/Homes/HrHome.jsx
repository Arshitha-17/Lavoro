import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const HrHome = () => {
  return (
    <div className=' py-5'>         
           <div className='d-flex'>
            
            <Link to= '/hr/login'>
            <Button variant='primary' className='me-3'>
              Sign In
            </Button>
            </Link>
            <Link to='/hr/register'>
            <Button variant='secondary' >
              Register
            </Button>
            </Link>
            
          </div>
    </div>
  );
};

export default HrHome;
