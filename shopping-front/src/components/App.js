import Home from './Home';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Registration from './Auth/Registration';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Account from './Account';
import IndexProducts from './IndexProducts';



function App() {

const [triggered, setTriggered] = useState(false)
const [shops, setShops] = useState([])
const [products, setProducts] = useState([])
const [message, setMessage] = useState('')
const [user, setUser] = useState({})
const [loggedIn, setLoggedIn] = useState(false)



// function fetchProducts(){
//   axios.get('http://localhost:3000/shops', {withCredentials: true})
//   .then(response => {
//     setShops(response.data.products)
//     // setProducts(response.data.products)
//   })
// }

useEffect(() => {
  axios.get('http://localhost:3000/shops', {withCredentials: true})
  .then(response => {
    if(response.data.products !== shops && triggered === true){
      setShops(response.data.products)
      // setProducts(response.data.products)
      console.log('trigger SHOPS')
      }
  })
 
}, [shops])



// function fetchAdminProducts(){
//   axios.get('http://localhost:3000/products', {withCredentials: true})
//   .then(response => {
//     setProducts(response.data.products)
//   })
// }

useEffect(() => {
  axios.get('http://localhost:3000/products', {withCredentials: true})
  .then(response => {
    if (response.data.products !== products && triggered === true){
    setProducts(response.data.products)
    
    console.log('trigger PRODUCT')
  }else if(response.data.products == products && triggered === false){
    console.log('ca marche')
  }
  })
}, [products])

function createProduct(name, description, price){
  axios.post('http://localhost:3000/products', {
  product: {
    name: name, 
    description: description,
    price: price
  }
  }, {withCredentials: true})
  .then(response => {
    setProducts([...products, 
     response.data.product])
    console.log(response)
  })
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

function editUser(email, password, edit_password, edit_password_confirmation){
  axios.patch(`http://localhost:3000/users/${user.id}`, 
  {user: {
    email: email,
    password: password,
    edit_password: edit_password,
    edit_password_confirmation: edit_password_confirmation
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
      setUser(response.data.user)
    }else if(!response.data.logged_in && loggedIn === true){
      setLoggedIn(false)
      setUser({})
    }
  })
}, [loggedIn])

function omniauth(){
  axios.post('http://localhost:3000/auth/google_oauth2', { withCredentials: true })
  .then(response => console.log(response))
}

console.log(shops)

  return (

    <div className="App">
      <Navbar loggedIn={loggedIn} logout={logout}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home shops={shops} /> } />
          <Route path="/login" element={ <Login message={message} loggedIn={loggedIn} loggingUser={loggingUser} logout={logout} omniauth={omniauth}/> } />
          <Route path="/registration" element={ <Registration registrationUser={registrationUser} message={message} /> } />
          <Route path="/account" element={ <Account user={user} editUser={editUser} message={message} /> } />
          <Route path="/products" element={ <IndexProducts createProduct={createProduct} products={products} setTriggered={setTriggered}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
