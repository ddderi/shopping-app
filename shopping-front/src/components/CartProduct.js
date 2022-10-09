import React from 'react';
import { useForm } from 'react-hook-form';
import { editOrderitem } from '../requests/ApiRequest';


export default function CartProduct({ productName, setTriggered, removeFromCart, data, shops }) {

  const { register, handleSubmit } = useForm()


  function productName(id) {
    if (shops.length > 0) {
      return (shops.find(element => element.id === id)).name
    } else {
      return 'Loading...'
    }
  }

  function productDescription(id) {
    if (shops.length > 0) {
      return (shops.find(element => element.id === id)).description
    } else {
      return 'Loading...'
    }
  }

  const editQuantityItem = async (quantity, id) => {
    try {
      const editItem = await editOrderitem(quantity, id)
      setTriggered(false)
      return editItem
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="containercart">
      <div className="leftcart">
        <span className="cartproduct"><strong>Product </strong> : {productName(data.product_id)}</span>
        <span className="cartproduct"><strong>Description</strong> : {productDescription(data.product_id)}</span>
      </div>
      <div className="rightcart ">
        <span className="cartproduct"><strong>Unit price</strong> : {data.unit_price}</span>
        <span className="cartproduct"><strong>Quantity</strong> : {data.quantity}</span>
        <form>
          <input {...register('quantity')} type='number' step={1} min={0} />
        </form>
        <span className="cartproduct"><strong>Total</strong> : ${data.total}</span>
        <div className='btnedit'>
          <button onClick={handleSubmit((props) => {
            console.log(props.quantity)
            editQuantityItem(props.quantity, data.id)
          })} className='btn btn-secondary btnediteach'>edit</button>
          <button onClick={() => { removeFromCart(data.id) }} className='btn btn-secondary btnediteach'>remove</button>
        </div>
      </div>

    </div>
  )
}
