import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

/**
 * Function that renders the Navbar component, but a simpler version.
 * It was built using the Bootstrap documentation:
 * https://getbootstrap.com/docs/5.0/components/navbar/
 *
 * @param {String} name
 * @returns React Component consisting in a navbar.
 */
export default function NavbarComponent ({ name }) {
  return (
    <Navbar bg='light' expand='lg' className='border-bottom-navbar'>
      <Container>
        <Navbar.Brand href='#home'>{name}</Navbar.Brand>
        <Navbar.Toggle aria-controls='content-on-the-right' />
      </Container>
    </Navbar>
  )
}
