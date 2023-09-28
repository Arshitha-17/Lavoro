
import { Container,Row,Col } from 'react-bootstrap';
import '../Login/Login.css'
const FormContainer = ({children}) => {
  return (
    <Container>
      <Row className='justify-content-center  formContainer' >
        
        <Col xs={25} md={12} className='card p-2 formCard' >
          
            {children}
        </Col>
      </Row>
    </Container>
  )
}
export default FormContainer
