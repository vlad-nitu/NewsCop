import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap'
import { useState } from 'react'

/**
 * Function that renders the Navbar component.
 * It was built using the Bootstrap documentation:
 * https://getbootstrap.com/docs/5.0/components/navbar/
 * and adjusted for this secondary page needs (i.e: to route back to main page when `About us`
 * is clicked, and at the bottom of the current page when `Contact` is clicked
 *
 * @param {String} name - the name of our application
 * @returns React Component consisting in a navbar.
 */
export default function NavbarComponent ({ name }) {
  const handleClick = () => {
    window.scrollTo(0, 0)
  }
  /**
     * Used for showing the dropdown menu on hover.
     * See more here: https://stackoverflow.com/questions/60373789/react-bootstrap-dropdown-on-hover
     */
  const [show, setShow] = useState(false)
  const showDropdown = (e) => {
    setShow(!show)
  }
  const hideDropdown = e => {
    setShow(false)
  }

  return (
    <Navbar bg='light' expand='lg' className='border-bottom-navbar'>
      <Container>
        <Navbar.Brand href='/#home'>{name}</Navbar.Brand>
        <Navbar.Toggle aria-controls='content-on-the-right' />
        <Navbar.Collapse id='content-on-the-right' className='justify-content-end'>
          {/* ml-auto is used to align a particular element to the right side of its container. */}
          <Nav className='ml-auto'>
            <Nav.Link href='/#ourMission' onClick={handleClick}>About us</Nav.Link>
            <NavDropdown title='Services' id='nav-dropdown' show={show} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
              <NavDropdown.Item href='/checkURL'>URL Similarity</NavDropdown.Item>
              <NavDropdown.Item href='/checkText'>Text Similarity</NavDropdown.Item>
              <NavDropdown.Item href='#action3'>URLs Comparison</NavDropdown.Item>
              <NavDropdown.Item href='#action4'>Texts Comparison</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='#footer' onClick={handleClick}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
