import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Product from './Product';
import axios from 'axios';

export default function IndexProducts({user, setMessage, triggered, setProducts, products, createProduct, setTriggered }) {

  const { register, handleSubmit, reset } = useForm()
 const [showform, setShowForm] = useState(false)
 const [showbutton, setShowButton] = useState(true)

 const showForm = () => {
  setShowForm(!showform);
  setShowButton(!showbutton)
}

function deleteProduct(id){
  axios.delete(`http://localhost:3000/products/${id}`, {withCredentials: true})
  .then(response => {
    setTriggered(false)
  })
}

useEffect(() => {
  axios.get('http://localhost:3000/products', {withCredentials: true})
  .then(response => {
    
    if (response.data.products !== products && triggered === false){
    setProducts(response.data.products)
    setTriggered(true)
    console.log('trigger PRODUCT FIRST TIME ')
  }else if(response.data.products === products && triggered === true){
    console.log('ca marche')
  }
  }).catch(err => {console.log('error', err)})
}, [products, triggered])

console.log(products)

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
          createProduct(dat)
          reset()
        })}>
          <label htmlFor='name'>Product name :</label>
          <input {...register('name')}  />
          <label htmlFor='name'>Description :</label>
          <textarea {...register('description')} />
          <label htmlFor='name'>Price :</label>
          <input {...register('price')} type='number' step={1} />
          {/* <label  htmlFor='image'>image</label> */}
          <input  {...register('image')} type='file' id='image' />
          <input className='btn btn-primary btnlogg' type='submit' />
          
        </form>
        )}
          {showbutton && ( <button className="btn btn-primary" onClick={() => showForm()}>add new product</button>
          )}
        <div className="row">
        
             {products.length > 0 ? products.map((data, index) => 
            { return <Product deleteProduct={deleteProduct} data={data} key={index}/>}) : <h3>No products</h3>}
        </div>
      </div>
    </div>
    : <div style={{textAlign: 'center'}} className="container">
      <strong>Not authorized to be here</strong></div>}
    </>
  )
}


