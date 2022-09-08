import React from 'react';
import ProductShops from './ProductShops';

export default function Home({shops}) {
  return (
     <div className='container-fluid'>
      <div className="container cont ">
        <div className="row">
         {shops.map((data, index)=> {return <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 cont" key={index}><ProductShops data={data}  /></div>})} 
         </div>
      </div>
    </div> 
  )
}



