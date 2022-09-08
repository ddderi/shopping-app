import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Product from './Product';
import axios from 'axios';

export default function IndexProducts({ products, createProduct, setTriggered }) {

  const { register, handleSubmit, reset } = useForm()
 const [showform, setShowForm] = useState(false)
 const [showbutton, setShowButton] = useState(true)

 const showForm = () => {
  setShowForm(!showform);
  setShowButton(!showbutton)
}

// function send(data1, data2){
//   const dat = new FormData();
//           dat.append("product[name]", data1);
//           dat.append("product[image]", data2);
//           console.log(dat)
//           return dat
// }

async function createProduct(data){
  
 let res = await axios.post('http://localhost:3000/products', data)

  let dd = res.data;
  console.log(dd)

//   axios.post('http://localhost:3000/products', {
//   product: {
//     name: data, 
//     // description: description,
//     // price: price,
//     // image: data2
//   }
//   }, {withCredentials: true})
//   .then(response => {
//   //   setProducts([...products, 
//   // response.data.product])
  
//  console.log(response)
    
//   })
}


function submitApi(data){
  fetch('http://localhost:3000/products', {
    method: "POST",
    body: data
  }).then(response => response.json())
  .then(response => console.log(response))
  
  .catch((err) => {console.log(err)})
}

  return (
    
    
    // createProduct(data.name, data.description, data.price, data.image)
    //       setTriggered(true)
    //       reset()
    <div className='container cont'>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
        {showform && (
        <form className='col-4 d-flex flex-column login' onSubmit={handleSubmit((data) => {
          // createProduct(data.name, data.description, data.price, data.image[0])
          // setTriggered(true)
          // reset()
          // console.log(data.image[0])
          // console.log(data.image)
           const dat = new FormData();
          dat.append("product[name]", data.name);
          dat.append("product[description]", data.description);
          dat.append("product[price]", data.price);
          dat.append("product[image]", data.image[0]);
          // createProduct(dat)
          // submitApi(dat)
          createProduct(dat)
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
          {showbutton && ( <button onClick={() => showForm()}>add new product</button>
          )}
        <div className="row">
        
             {products.length > 0 ? products.map((data, index) => 
            { return <Product data={data} key={index}/>}) : <h3>No products</h3>}
        </div>
      </div>
    </div>
  )
}


