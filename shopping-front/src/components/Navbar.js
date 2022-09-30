import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { logout } from '../../src/requests/RequestUser';


function ColorSchemesExample({setLoggedIn, loggedIn, setMessage, user}) {

const loggedUserOut = async () => {
  try{
  const loggingOut = await logout()
  if(loggingOut.status === 200){
  setLoggedIn(false)
  setMessage(loggingOut.message)
  return loggingOut
   }
}catch(error){
  console.log(error)
}}


  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Welcome</Navbar.Brand>
          {loggedIn ? 
          <Nav className="me-auto">
            <Nav.Link href="/account">Account</Nav.Link>
            <Nav.Link href="/cart">Your cart</Nav.Link>
            <Nav.Link onClick={() => {
              loggedUserOut()
            }} href="#">Log-out</Nav.Link>
            {user.manager ? <Nav.Link href="/products">Products</Nav.Link> : null}
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav> : 
            <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/registration">Registration</Nav.Link>
            <Nav.Link href="/cart">Your cart</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
}   
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;