import Home from './Home';
import { BrowserRouter,  Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Registration from './Auth/Registration';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Account from './Account';
import IndexProducts from './IndexProducts';
import Cart from './Cart';
import { loggedStatus, productShops } from '../requests/ApiRequest';



function App() {


const [triggered, setTriggered] = useState(false)
const [shops, setShops] = useState([])
const [products, setProducts] = useState([])
const [message, setMessage] = useState('')
const [user, setUser] = useState({})
const [loggedIn, setLoggedIn] = useState(false)
const [cart, setCart] = useState([])
const [orders, setOrders] = useState([])

useEffect(() => {
  productShops(shops, triggered, setTriggered, setShops)
}, [shops, triggered])


useEffect(() => {
  loggedStatus(loggedIn, setLoggedIn, setUser)
}, [loggedIn])


  return (

    <div className="App">
      <Navbar user={user} setMessage={setMessage} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home user={user} shops={shops} cart={cart} setCart={setCart} message={message} setMessage={setMessage}/> } />
          <Route path="/login" element={ loggedIn ? <Navigate to="/account" /> : <Login message={message} setLoggedIn={setLoggedIn} setUser={setUser} setMessage={setMessage} loggedIn={loggedIn}/> } />
          <Route path="/registration" element={ <Registration loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} setMessage={setMessage} message={message} /> } />
          <Route path="/account" element={ <Account loggedIn={loggedIn} setMessage={setMessage} setOrders={setOrders} orders={orders} user={user} message={message} setTriggered={setTriggered} triggered={triggered} />  } />
          <Route path="/products" element={ <IndexProducts user={user} setMessage={setMessage} triggered={triggered} setProducts={setProducts} products={products} setTriggered={setTriggered}/> } />
          <Route path="/cart" element={ <Cart shops={shops} loggedIn={loggedIn} setCart={setCart} setMessage={setMessage} triggered={triggered} message={message} user={user} cart={cart} setTriggered={setTriggered} />   } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
