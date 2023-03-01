import Home from "./Home";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Login from "./Auth/Login";
import Registration from "./Auth/Registration";
import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Account from "./Account";
import IndexProducts from "./IndexProducts";
import Cart from "./Cart";
import { loggedStatus, productShops } from "../requests/ApiRequest";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser, setError, logout } from "../redux/authSlice.jsx";
import { auth, db } from "../config/firebase-config";

function App() {
  const [triggered, setTriggered] = useState(false);
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  // const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        window.localStorage.setItem("auth", "true");
        dispatch(
          setUser({
            userLogged: true,
            user: userAuth.multiFactor.user.displayName,
            token: userAuth.multiFactor.user.accessToken,
          })
        );
        console.log(userAuth);
      } else {
        console.log("usernot logged");
      }
    });
  }, []);

  useEffect(() => {
    productShops(shops, triggered, setTriggered, setShops);
  }, [shops, triggered]);

  useEffect(() => {
    loggedStatus(loggedIn, setLoggedIn, setUser);
  }, [loggedIn]);

  return (
    <div className="App">
      <Navbar
        setMessage={setMessage}
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                shops={shops}
                cart={cart}
                setCart={setCart}
                message={message}
                setMessage={setMessage}
              />
            }
          />
          <Route
            path="/login"
            element={
              loggedIn ? (
                <Navigate to="/account" />
              ) : (
                <Login
                  message={message}
                  setLoggedIn={setLoggedIn}
                  setUser={setUser}
                  setMessage={setMessage}
                  loggedIn={loggedIn}
                />
              )
            }
          />
          <Route
            path="/registration"
            element={
              <Registration
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setUser={setUser}
                setMessage={setMessage}
                message={message}
              />
            }
          />
          <Route
            path="/account"
            element={
              <Account
                loggedIn={loggedIn}
                setMessage={setMessage}
                setOrders={setOrders}
                orders={orders}
                message={message}
                setTriggered={setTriggered}
                triggered={triggered}
              />
            }
          />
          <Route
            path="/products"
            element={
              <IndexProducts
                setMessage={setMessage}
                triggered={triggered}
                setProducts={setProducts}
                products={products}
                setTriggered={setTriggered}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                shops={shops}
                loggedIn={loggedIn}
                setCart={setCart}
                setMessage={setMessage}
                triggered={triggered}
                message={message}
                cart={cart}
                setTriggered={setTriggered}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
