import { Container, Card, Button } from 'react-bootstrap';
const HrHome = () => {
  return (
    <div className=' py-5'>         
          <div className='d-flex'>
            <Button variant='primary' href='/hr/login' className='me-3'>
              Sign In
            </Button>
            <Button variant='secondary' href='/hr/register'>
              Register
            </Button>
          </div>
    </div>
  );
};

export default HrHome;
