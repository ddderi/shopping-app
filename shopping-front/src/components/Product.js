import React from 'react'

export default function Product({data}) {
  return (
    <div className='row product '>
        <span>{data.name}</span> 
        <span>{data.description}</span>
        <span>{data.price}</span>
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