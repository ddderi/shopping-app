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
  const data = window.localStorage.getItem('SHOPPING_APP')
  if(data !== null){  
    setLoggedIn(JSON.parse(data))
  }
}, [])

console.log(user)

useEffect(() => {
  axios.get('http://localhost:3000/shops', {withCredentials: true})
  .then(response => {
    if(response.data.products !== shops && triggered === false){
      setShops(response.data.products)
      // setProducts(response.data.products)
      setTriggered(true)
      }
  })
 
}, [shops, triggered])



async function createProduct(data){

  let res = await axios.post('http://localhost:3000/products', data)
 
   let datapost = res.data;
   console.log(datapost)
   setProducts([...products, datapost.product])
 
}


function loggingUser(email, password){
  axios.post("http://localhost:3000/login", {
    user: {
      email: email,
      password: password
    }
  }, { withCredentials: true })
  .then(response => {
    if(response.data.logged_in){
      setLoggedIn(true)
      setUser(response.data.user)
      setMessage(response.data.message)
     console.log(response)
     
    }else{
      console.log(response)
      setMessage(response.data.message)
    }
  })
  .catch(err => {
    setMessage('Incorrect email or password')
    console.log('API error', err)
  })
}

function registrationUser(email, password, 
  password_confirmation, 
  first_name, last_name, 
  street_address_1, 
  street_address_2, 
  city, 
  state, 
  zipcode ){
  axios.post("http://localhost:3000/users", {
    user: {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      first_name: first_name,
      last_name: last_name,
      address_attributes: {
      street_address_1: street_address_1,
      street_address_2: street_address_2,
      city: city,
      state: state,
      zipcode: zipcode}
    }
  }, { withCredentials: true })
  .then(response => {
    if(response.data.logged_in){
    setUser(response.data.user)
    setLoggedIn(true)
    setMessage('')
    
    console.log('succed', response)
    
    }else{
      setMessage(response.data.errors)
    }
  })
  .catch(err => {
    setMessage('address must be complete')
    // console.log('serv error', err)
  })
}

function logout(){
  axios.delete('http://localhost:3000/logout', {withCredentials: true})
  .then(response => {
    if(response.data.logged_out && loggedIn === true){
      setLoggedIn(false)
      setUser({})
      setMessage('')
      console.log(response)
    }else if(!response.data.logged_out && loggedIn === false){
      console.log('problem')
    }
  })
}

function editUser(email, password, edit_password, edit_password_confirmation, manager){
  axios.patch(`http://localhost:3000/users/${user.id}`, 
  {user: {
    email: email,
    password: password,
    edit_password: edit_password,
    edit_password_confirmation: edit_password_confirmation, 
    manager: manager
  }},
  {withCredentials: true})
  .then(response => {
    if(response.data.status === 500){
          setMessage(response.data.message)
        }else if(response.status === 200){
          console.log(response)
          setMessage('Your password has been correctly updated')
        }
  }).catch( err => {
    console.log('error', err)
  })
}


useEffect(() => {
  axios.get('http://localhost:3000/logged_in', {withCredentials: true})
  .then(response => {
    if(response.data.logged_in && loggedIn === false){
      console.log(response)
      setLoggedIn(true)
      console.log('Useeffect trigger')
      setUser(response.data.user)
    }else if(!response.data.logged_in && loggedIn === true){
      setLoggedIn(false)
      setUser({})
    }
  }).then(() =>{
    window.localStorage.setItem('SHOPPING_APP', JSON.stringify(loggedIn))
  })
}, [loggedIn])

function omniauth(){
  axios.post('http://localhost:3000/auth/google_oauth2', { withCredentials: true })
  .then(response => console.log(response))
}


function editOrderitem(quantity, id){
  axios.patch(`http://localhost:3000/order_items/${id}`, 
  {order_item: {
    quantity: quantity,
    
  }},
  {withCredentials: true})
 .then(response => {
  setTriggered(false)
  console.log(response)
 }).catch((err) => {console.log('error serv', err)})
}


function removeFromCart(id){
  axios.delete(`http://localhost:3000/order_items/${id}`, {withCredentials: true})
  .then(response => {
    if(response.data.status === 'deleted'){
      setTriggered(false)
      console.log(response)
    }
    // console.log(response)
  })
  .catch(err => {console.log('server error', err)})
}

function productName(id){
  if(shops.length>0){
  return (shops.find(element => element.id === id )).name
  }else{
    return 'Loading...'
  }
}

function productDescription(id){
  if(shops.length>0){
  return (shops.find(element => element.id === id )).description
  }else{
    return 'Loading...'
  }
}


async function addProductToCart(data){
  let res = await axios.post(`http://localhost:3000/order_items`, data)
   if(res.data.quantity){
   setMessage(res.data.quantity)
   
   }
}



function fetchOrders(){
  axios.get('http://localhost:3000/orders', {withCredentials: true})
  .then(response =>{
    if(response.data.orders !== orders && triggered === false) {
    setOrders(response.data.orders)
    setTriggered(true)
    }else if(response.data.orders === orders && triggered === true){
      console.log('rien')
    }
  })
}
// loggedIn ? <Navigate to="/" /> :

console.log(products)

  return (

    <div className="App">
      <Navbar user={user} loggedIn={loggedIn} logout={logout} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home addProductToCart={addProductToCart} user={user} shops={shops} cart={cart} setCart={setCart} message={message} setMessage={setMessage}/> } />
          <Route path="/login" element={ loggedIn ? <Navigate to="/account" /> : <Login message={message} loggedIn={loggedIn} loggingUser={loggingUser} logout={logout} omniauth={omniauth}/> } />
          <Route path="/registration" element={ <Registration loggedIn={loggedIn} registrationUser={registrationUser} message={message} /> } />
          <Route path="/account" element={ <Account loggedIn={loggedIn} fetchOrders={fetchOrders} orders={orders} user={user} editUser={editUser} message={message} triggered={triggered} />  } />
          <Route path="/products" element={ <IndexProducts user={user} setMessage={setMessage} triggered={triggered} setProducts={setProducts} createProduct={createProduct} products={products} setTriggered={setTriggered}/> } />
          <Route path="/cart" element={ <Cart loggedIn={loggedIn} setCart={setCart} setMessage={setMessage} triggered={triggered} message={message} user={user} removeFromCart={removeFromCart} productName={productName} productDescription={productDescription} editOrderitem={editOrderitem} cart={cart} setTriggered={setTriggered} />   } />
          {/* <Route path="/product/id=" element={ <ProductDetails />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
