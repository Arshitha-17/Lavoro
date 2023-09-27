import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import logoImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/WhatsApp Image 2023-09-26 at 8.21.43 PM-PhotoRoom.png-PhotoRoom.png'; 
import './Header.css'

const Header = () => {
  
    return (
      <header>
      <Navbar className='navbarStyle' variant='dark' expand='lg' collapseOnSelect>
            <Navbar.Brand href='/'>
              <img style={{ paddingLeft: '15px' }}
                src={logoImage}
                alt='Logo'
                width='150' 
                height='50'
                className='d-inline-block align-top' 
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav' >
                    <Nav className='ms-auto mx-auto ' > {/* Use mx-auto class for centering */}
                    <Nav.Link href='/' className=' text-white me-5'><h5>Home</h5></Nav.Link>
                        <Nav.Link href='/jobs' className=' text-white me-5'><h5>Job</h5></Nav.Link>
                        <Nav.Link href='/profile' className=' text-white me-5'><h5>Profile</h5></Nav.Link>
                        <Nav.Link href='/contact' className=' text-white me-5'><h5>Contact</h5></Nav.Link>
                    </Nav>
                    <Nav.Link href='login'>
                      <Button className='me-2 login-button' style={{'borderRadius':'90px' }}>Login</Button>
                      </Nav.Link>

                    <Nav.Link href='/logout'>
                        <FaSignOutAlt className='logout' style={{height:'30px'}} />
                    </Nav.Link>
            </Navbar.Collapse>
         
        </Navbar>
      </header>
    );
};

export default Header;
