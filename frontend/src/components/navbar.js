import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap'
import { useState } from 'react'

/**
 * Function that renders the Navbar component.
 * It was built using the Bootstrap documentation:
 * https://getbootstrap.com/docs/5.0/components/navbar/
 *
 * @param name - the name of the navbar, in this case our application
 * @param mainPage, a boolean, true if the navbar is rendered in the Main Page,
 * false if it is rendered in one of the feature pages
 * @returns React Component consisting in a navbar.
 */
export default function NavbarComponent ({ name, mainPage }) {
  const handleClick = () => {
    window.scrollTo(0, 0)
  }

  /**
     * Used for showing the dropdown menu on hover of the mouse.
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
        {mainPage && <Navbar.Brand href='#home'>{name}</Navbar.Brand>}
        {!mainPage && <Navbar.Brand href='/#home' onClick={handleClick}>{name}</Navbar.Brand>}
        <Navbar.Toggle aria-controls='content-on-the-right' />
        <Navbar.Collapse id='content-on-the-right' className='justify-content-end'>
          {/* ml-auto is used to align a particular element to the right side of its container. */}
          <Nav className='ml-auto'>
            {mainPage && <Nav.Link href='#ourMission'>About us</Nav.Link>}
            {!mainPage && <Nav.Link href='/#ourMission' onClick={handleClick}>About us</Nav.Link>}
            {mainPage && <Nav.Link href='#services'>Services</Nav.Link>}
            {!mainPage &&
              <NavDropdown
                title='Services' id='nav-dropdown' data-testid='navbar' show={show}
                onMouseEnter={showDropdown} onMouseLeave={hideDropdown}
              >
                <NavDropdown.Item role='option' href='/checkURL'>URL Similarity Checker</NavDropdown.Item>
                <NavDropdown.Item role='option' href='/checkText'>Text Similarity Checker</NavDropdown.Item>
                <NavDropdown.Item role='option' href='/compareTexts'>Similarity Checker for two Texts</NavDropdown.Item>
                <NavDropdown.Item role='option' href='/compareURLs'>Similarity Checker for two URLs</NavDropdown.Item>
              </NavDropdown>}
            <Nav.Link href='#footer'>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
