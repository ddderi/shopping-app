import React from 'react';
import { useForm } from 'react-hook-form';


export default function ProductShops({data, user, addProductToCart}) {
 
  const { register, handleSubmit, reset } = useForm()


  return (
    <form onSubmit={handleSubmit((prod) => {
       const form = new FormData();

       form.append('order_item[product_id]', data.id)
       form.append('order_item[quantity]', prod.quantity)
       form.append('order_item[unit_price]', data.price)
       form.append('order_item[cart_id]', user.id)
      
      addProductToCart(form)
      reset()
     
      })}>
        <div className="card ">
          <div className='imgtopcard'>
          <img className="card-img-top imgimg" src={data.image_url} alt="Card cap"/>
          </div>
            <div className="card-body">
            
              <label htmlFor='quantity'>quantity :</label><br></br>
            <input {...register('quantity')} type="number" id="quantity" name="quantity" step="1" min={0} />
           
        
            <h5 className="card-title">{data.name}</h5>
          <button type='submit'  className="btn btn-primary">Add to your cart</button>
          </div>
        </div>
      </form>
  )
}
