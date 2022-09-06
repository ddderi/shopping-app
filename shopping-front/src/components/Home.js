import React from 'react';
import ProductShops from './ProductShops';

export default function Home({shops}) {
  return (
     <div className='container'>
      <div className="container-fluid cont row ">
         {shops.map((data, index)=> {return <ProductShops data={data} key={index} />})} 
      </div>
    </div> 
  )
}



