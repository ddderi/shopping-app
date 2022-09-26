import React from 'react';
import CartProduct from './CartProduct';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart({ setCart, setTriggered, setMessage, triggered, message, user, cart, removeFromCart, editOrderitem, productDescription, productName}) {

const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/cart', {withCredentials: true})
    .then(response => {
      if(response.data !== cart && triggered === false){
      setCart(response.data)
      console.log(cart)
      setTriggered(true)}
      else if(response.data.connected === false)
      {setMessage('You have to be connected to have access to your cart')}
      console.log(response)
    }).catch(err => {
      console.log('serv error', err)
    })
  }, [cart, triggered, setTriggered, setMessage, setCart])



function checkoutprice(){
  if(cart.length>0){
  return cart.reduce((a, b) => parseInt(a) + parseInt(b.total), 0)
  }else{ return 'No article in your cart'}
}

function resetCart(){
 return  cart.map(items =>  removeFromCart(items.id) )
}

 
function checkout(data){
  axios.post('http://localhost:3000/orders', {
    order: {
      total: data,
      user_id: user.id
    }
  }, {withCredentials: true})
  .then(response => {
    console.log(response)
    
  })
  .then(resp => {
    resetCart()
  })
  
}
 

  return (
    <div className='container-fluid'>
        <div className=".flex-row">
        <div className='container'>
            {message ? <h3 style={{textAlign: 'center', marginTop: '2%'}} >{message}</h3> : cart.length > 0  ? cart.map((data, index)=> {return <CartProduct  key={index} productName={productName} removeFromCart={removeFromCart} productDescription={productDescription} editOrderitem={editOrderitem} data={data}  />}) : 
            <div className='d-flex flex-column align-items-center justify-content-flex-end container-fluid col-12' >

            <h3  style={{textAlign: 'center', marginTop: '2%'}} >Your cart is empty ...</h3>
            <button style={{marginTop: '2%'}} className='btn btn-primary'  onClick={(e) => navigate('/account')}>Click here to see your(s) order(s)</button>
            </div>
             }  
            
          <div className="footercart">
            <div className='innerfootercart'>
              {cart.length > 0 ? <span>Total : ${checkoutprice()},00</span>: null }
              {cart.length > 0 ? <button onClick={() => checkout(checkoutprice())} className='btn btn-primary btnlogg'>Check-out</button> : null }
              {/* checkout(checkoutprice()) */}
            </div>
          </div>
            </div>
        </div>
    </div>
  )
}
