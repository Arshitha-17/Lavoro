import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

import logoImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/WhatsApp Image 2023-09-26 at 8.21.43 PM-PhotoRoom.png-PhotoRoom.png'; 

const Header = () => {
    const navbarStyle = {
        background: 'linear-gradient(to bottom, #065659, black)', 
      };
      
      
    return (
      <header>
        <Navbar style={navbarStyle} variant='dark' expand='lg' collapseOnSelect>
     
            <Navbar.Brand href='/' >
              <img style={{paddingLeft:'15px'}}
                src={logoImage}
                alt='Logo'
                width='150' 
                height='50'
                className='d-inline-block align-top' 
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <Nav.Link href='/login'>
                  
                </Nav.Link>
                <Nav.Link href='/login'>
                  <FaSignOutAlt />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
         
        </Navbar>
      </header>
    );
  };
  
  export default Header;