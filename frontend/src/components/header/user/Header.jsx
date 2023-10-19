import { Navbar, Nav, Button } from 'react-bootstrap';
import {FaSignOutAlt } from 'react-icons/fa';
import logoImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/WhatsApp Image 2023-09-26 at 8.21.43 PM-PhotoRoom.png-PhotoRoom.png'; 
import './Header.css'
import {LinkContainer} from 'react-router-bootstrap'
const Header = () => {
  
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
                    <LinkContainer to='/login'>
                    <Nav.Link >
                      <Button className='me-2 login-button' style={{'borderRadius':'90px' }}>Login</Button>
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/logout'>
                    <Nav.Link >
                        <FaSignOutAlt className='logout' style={{height:'30px'}} />
                    </Nav.Link>
                    </LinkContainer>
            </Navbar.Collapse>
        </Navbar>
      </header>
    );
};

export default Header;
