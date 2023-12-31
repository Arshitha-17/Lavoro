import { Navbar, Nav, Button } from 'react-bootstrap';
import {FaSignOutAlt } from 'react-icons/fa';
import logoImage from './logo.png'; 
import './Header.css'
import {LinkContainer} from 'react-router-bootstrap'
import {toast} from "react-toastify"

const Header = () => {

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));


  const handleLogout = () => {
   
    localStorage.removeItem('userInfo');
    toast.success('Logout successful!', {
      position: 'top-right',
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  
    return (
      

      <header className='headertag'>
      <Navbar className='navbarStyle' variant='dark' expand='lg' collapseOnSelect>
        <LinkContainer to='/' >
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
                    <LinkContainer to='/' >
                    <Nav.Link className=' text-white me-5'><h5>Home</h5></Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/jobList'>
                        <Nav.Link  className=' text-white me-5'><h5>Job</h5></Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/profile'>
                        <Nav.Link  className=' text-white me-5'><h5>Profile</h5></Nav.Link>
                    </LinkContainer>
                  
                    <LinkContainer to='/contact'>
                        <Nav.Link  className=' text-white me-5'><h5>Contact</h5></Nav.Link>
                    </LinkContainer>
                    </Nav>
                    {userInfo ? ( // Check if user is logged in (userInfo exists in localStorage)
            <>
              <FaSignOutAlt
                className='logout'
                style={{ height: '30px' }}
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              <LinkContainer to='/login'>
                <Nav.Link>
                  <Button className='me-2 login-button' style={{ borderRadius: '90px' }}>Login</Button>
                </Nav.Link>
              </LinkContainer>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
      </header>
    );
};

export default Header;
