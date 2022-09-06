import React from 'react';
import { useForm } from 'react-hook-form';
import Product from './Product'

export default function IndexProducts({ products, createProduct, setTriggered }) {

  const { register, handleSubmit, reset } = useForm()

  return (
    
    <div className='container cont'>
      <div className="container-fluid">
        <form onSubmit={handleSubmit((data) => {
          createProduct(data.name, data.description, data.price)
          setTriggered(true)
          reset()
        })}>
          <label htmlFor='name'>Product name :</label>
          <input {...register('name')} />
          <label htmlFor='name'>Description :</label>
          <input {...register('description')} />
          <label htmlFor='name'>Price :</label>
          <input {...register('price')} type='number' step={1} />
          <input type='submit' />
        </form>
        {console.log(products)}
        {products.length > 0 ? products.map((data, index) => {return <Product data={data} key={index}/>}) : <h3>No products</h3>}
      </div>
    </div>
  )
}
