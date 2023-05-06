import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarComponent({ name }) {
    return (
        <Navbar bg="light" expand="lg" className="border-bottom-navbar">
            <Container>
                <Navbar.Brand href="#home">{ name }</Navbar.Brand>
                <Navbar.Toggle aria-controls="content-on-the-right" />
                <Navbar.Collapse id="content-on-the-right" className="justify-content-end">
                    <Nav className="ml-auto">
                        <Nav.Link href="#ourMission">About us</Nav.Link>
                        <Nav.Link href="#services">Services</Nav.Link>
                        <Nav.Link href="#footer">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}