import React from 'react'

export default function Product({data}) {
  console.log(data)
  return (
   
    <div className='row productAdmin '>
        <span>{data.name}</span> 
        <span>{data.description}</span>
        <span>{data.price}</span>
       
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