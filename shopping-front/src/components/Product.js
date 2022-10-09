import React from 'react';
import { deleteProduct } from '../requests/ApiRequest'

export default function Product({ data, setTriggered }) {

  async function deletingProd(id) {
    try {
      const deleteProd = await deleteProduct(id)
      setTriggered(false)
      return deleteProd.data
    } catch (error) {
      console.log(error)
    }
  }



  return (

    <div className='row productAdmin '>
      <span>{data.name}</span>
      <span>{data.description}</span>
      <span>{data.price}</span>
      <button onClick={() => { deletingProd(data.id) }} >remove</button>
      {/* <img  src={data.image_url}  /> */}

    </div>
  )
}


{/* <div className='container'>
        <div className="container-flui">
            <div className="row">
                <span>{data.name}</span> 
                <span>{data.description}</span>
            </div>
        </div>
    </div> */}