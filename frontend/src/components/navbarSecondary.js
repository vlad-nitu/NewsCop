import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useRef } from 'react';

/**
 * Function that renders the Navbar component.
 * It was built using the Bootstrap documentation:
 * https://getbootstrap.com/docs/5.0/components/navbar/
 *
 * @param {String} name
 * @returns React Component consisting in a navbar.
 */
export default function NavbarComponent ({ name }) {

  const servicesRef = useRef(null)
  const ourMissionRef = useRef(null)
  const footerRef = useRef(null)

    const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Navbar bg='light' expand='lg' className='border-bottom-navbar'>
      <Container>
        <Navbar.Brand href='/#home'>{name}</Navbar.Brand>
        <Navbar.Toggle aria-controls='content-on-the-right' />
        <Navbar.Collapse id='content-on-the-right' className='justify-content-end'>
          {/* ml-auto is used to align a particular element to the right side of its container. */}
          <Nav className='ml-auto'>
            <Nav.Link href='/#ourMission' onClick={() => scrollTo(ourMissionRef) }>About us</Nav.Link>
            <Nav.Link href='/#services' onClick={() => scrollTo(servicesRef) }>Services</Nav.Link>
            <Nav.Link href='/#footer' onClick={() => scrollTo(footerRef)}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
