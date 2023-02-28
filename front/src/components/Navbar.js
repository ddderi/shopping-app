import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { logout } from "../../src/requests/RequestUser";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice.jsx";
import firebase from "firebase/compat/app";
import "firebase/auth";

function ColorSchemesExample({ setLoggedIn, loggedIn, setMessage, user }) {
  const userLogged = useSelector((state) => state.authUser.userLogged);

  const dispatch = useDispatch();
  console.log(userLogged);

  const loggedUserOut = async () => {
    try {
      const logOutUser = await firebase.auth().signOut();
      dispatch(logout());
      window.localStorage.removeItem("auth");
      return logOutUser;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar bg="primary menu-navbar" variant="dark">
        <Container>
          <Navbar.Brand href="/">Welcome</Navbar.Brand>
          {userLogged && (
            <Nav className="me-auto">
              <Nav.Link href="/account">Account</Nav.Link>
              <Nav.Link href="/cart">Your cart</Nav.Link>
              <Nav.Link
                onClick={() => {
                  loggedUserOut();
                }}
                href="#"
              >
                Log-out
              </Nav.Link>
              {/* {user.manager ? (
                <Nav.Link href="/products">Products</Nav.Link>
              ) : null} */}
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
          )}
          {!userLogged && (
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/registration">Registration</Nav.Link>
              <Nav.Link href="/cart">Your cart</Nav.Link>
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
