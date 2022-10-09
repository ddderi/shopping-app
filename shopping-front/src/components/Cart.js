import React from 'react';
import CartProduct from './CartProduct';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCart, checkout, removeProdFromCart } from '../requests/ApiRequest';


export default function Cart({ shops, setCart, setTriggered, setMessage, triggered, message, user, cart }) {

  const navigate = useNavigate()

  useEffect(() => {
    fetchCart(cart, triggered, setTriggered, setCart, setMessage)
  }, [cart, triggered])


  function checkoutprice() {
    if (cart.length > 0) {
      return cart.reduce((a, b) => parseInt(a) + parseInt(b.total), 0)
    } else { return 'No article in your cart' }
  }

  const removeFromCart = async (id) => {
    try {
      const removedItem = await removeProdFromCart(id)
      if (removedItem.status === 'deleted') {
        setTriggered(false)
        setMessage(removedItem.message)
        return console.log(removedItem)
      }
    } catch (error) {
      console.log(error)
    }
  }


  function resetCart() {
    return cart.map(items => removeFromCart(items.id))
  }


  const checkingOut = async (price) => {
    try {
      const checkCartOut = await checkout(price, user, resetCart)
      setMessage(checkCartOut.message)
      return console.log(checkCartOut)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='container-fluid'>
      <div className=".flex-row">
        <div className='container'>
          {message ? <h3 style={{ textAlign: 'center', marginTop: '2%' }} >{message}</h3> : null}
          {cart.length > 0 ? cart.map((data, index) => { return <CartProduct setTriggered={setTriggered} shops={shops} key={index} data={data} removeFromCart={removeFromCart} /> }) :
            <div className='d-flex flex-column align-items-center justify-content-flex-end container-fluid col-12' >

              <h3 style={{ textAlign: 'center', marginTop: '2%' }} >Your cart is empty ...</h3>
              <button style={{ marginTop: '2%' }} className='btn btn-primary' onClick={(e) => navigate('/account')}>Click here to see your(s) order(s)</button>
            </div>
          }

          <div className="footercart">
            <div className='innerfootercart'>
              {cart.length > 0 ? <span>Total : ${checkoutprice()},00</span> : null}
              {cart.length > 0 ? <button onClick={() => checkingOut(checkoutprice())} className='btn btn-primary btnlogg'>Check-out</button> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
