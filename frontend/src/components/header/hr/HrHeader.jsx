import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import logoImage from './logo.png'; 
import './HrHeader.css'
import { LinkContainer } from 'react-router-bootstrap';
import { IoIosNotificationsOutline } from 'react-icons/io'
import { toast } from 'react-toastify';
const HrHeader = () => {

  const hrInfo = JSON.parse(localStorage.getItem("HRInfo"))

  const handleLogout = () => {
    localStorage.removeItem("HRInfo");
    toast.success("Logout Successfully")
  }

  return (
    <header>
      <Navbar className='navbarStyle' variant='dark' expand='lg' collapseOnSelect>
        <LinkContainer to='/hr/' >
          <Navbar.Brand >
            <img style={{ paddingLeft: '15px' }}
              src={logoImage}
              alt='Logo'
              width='150'
              height='50'
              className='d-inline-block align-top'
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' >
          <Nav className='ms-auto mx-auto ' > {/* Use mx-auto class for centering */}
            <LinkContainer to='/hr/' >
              <Nav.Link className=' text-white me-5'><h5>Home</h5></Nav.Link>
            </LinkContainer>
            <LinkContainer to='/hr/applications'>
              <Nav.Link className=' text-white me-5'><h5>Applications</h5></Nav.Link>
            </LinkContainer>
            <LinkContainer to='/hr/profile'>
              <Nav.Link className=' text-white me-5'><h5>Profile</h5></Nav.Link>
            </LinkContainer>
            <LinkContainer to='hr/jobList'>
              <Nav.Link className=' text-white me-5'><h5>Jobs</h5></Nav.Link>
            </LinkContainer>
          </Nav>
          {hrInfo ? (
            <>
              <FaSignOutAlt onClick={handleLogout} className='logout' style={{ height: '30px' }} />
            </>
          ) : (

            <LinkContainer to='/hr/login'>
              <Nav.Link >
                <Button className='me-2 login-button' style={{ 'borderRadius': '90px' }}>Login</Button>
              </Nav.Link>
            </LinkContainer>
          )
          }
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default HrHeader;
