import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample({loggedIn, logout}) {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Welcome</Navbar.Brand>
          {loggedIn ? 
          <Nav className="me-auto">
            <Nav.Link href="/account">Account</Nav.Link>
            <Nav.Link href="#">Your cart</Nav.Link>
            <Nav.Link onClick={() => logout()} href="#">Log-out</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav> : 
            <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/registration">Registration</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
}   
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;