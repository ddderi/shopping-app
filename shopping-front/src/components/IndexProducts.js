import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Product from './Product';
import { creatProduct, deleteProduct, fetchIndexProducts } from '../requests/ApiRequest';

export default function IndexProducts({user, triggered, setProducts, products, setTriggered }) {

const { register, handleSubmit, reset } = useForm()
const [showform, setShowForm] = useState(false)
const [showbutton, setShowButton] = useState(true)
 

async function triggerCreate(dat){
try{
  const newProd = await creatProduct(dat)
  setProducts([...products, newProd.product])
  console.log(newProd.product)
  return newProd.product
}catch(error){
  console.log(error)
}}

 const showForm = () => {
  setShowForm(!showform);
  setShowButton(!showbutton)
}

useEffect(() => {
  fetchIndexProducts(products, triggered, setProducts, setTriggered)
}, [products, triggered])



  return (
   
    <>
    {user.manager ?  
    <div className='container cont'>
       
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
        
        {showform && (
        <form className='col-4 d-flex flex-column login' onSubmit={handleSubmit((data) => {
         
           const dat = new FormData();
          dat.append("product[name]", data.name);
          dat.append("product[description]", data.description);
          dat.append("product[price]", data.price);
          dat.append("product[image]", data.image[0]);
          triggerCreate(dat)
          reset()
        })}>
          <label htmlFor='name'>Product name :</label>
          <input {...register('name')}  />
          <label htmlFor='name'>Description :</label>
          <textarea {...register('description')} />
          <label htmlFor='name'>Price :</label>
          <input {...register('price')} type='number' min={0} step={1} />
          {/* <label  htmlFor='image'>image</label> */}
          <input  {...register('image')} type='file' id='image' />
          <input className='btn btn-primary btnlogg' type='submit' />
          
        </form>
        )}
          {showbutton && ( <button className="btn btn-primary" onClick={() => showForm()}>add new product</button>
          )}
        <div className="row">
        
             {products.length > 0 ? products.map((data, index) => 
            { return <Product setTriggered={setTriggered} data={data} key={index}/>}) : <h3>No products</h3>}
        </div>
      </div>
    </div>
    : <div style={{textAlign: 'center'}} className="container">
      <strong>Not authorized to be here</strong></div>}
    </>
  )
}


