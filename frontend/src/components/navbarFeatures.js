import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

/**
 * Function that renders the Navbar component, but a simpler version.
 * It was built using the Bootstrap documentation:
 * https://getbootstrap.com/docs/5.0/components/navbar/
 *
 * @param {String} name
 * @returns React Component consisting in a navbar.
 */
export default function NavbarComponent ({ name }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }
  return (
    <Navbar bg='light' expand='lg' className='border-bottom-navbar'>
      <Container>
        <Navbar.Brand href='' onClick={handleClick}>{name}</Navbar.Brand>
        <Navbar.Toggle aria-controls='content-on-the-right' />
        <Navbar.Collapse id='content-on-the-right' className='justify-content-end'>
          {/* ml-auto is used to align a particular element to the right side of its container. */}
          <Nav className='ml-auto'>
            <Nav.Link href='' onClick={handleClick}>About us</Nav.Link>
            <Nav.Link href=''>Services</Nav.Link>
            <Nav.Link href='#footer'>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
