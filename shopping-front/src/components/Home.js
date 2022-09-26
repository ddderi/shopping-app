import React from 'react';
import ProductShops from './ProductShops';

export default function Home({shops, user, message, addProductToCart}) {
  return (
     <div className='container-fluid'>
      <div className="container cont ">
      {message ? <h3 className='row-4 error'style={{border: '2px solid black', textAlign: 'center'}} >{message}</h3> : null }
        <div className="row">
         {shops.map((data, index)=> {return <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 cont" key={index}><ProductShops addProductToCart={addProductToCart} user={user} data={data}/></div>})} 
         </div>
      </div>
    </div> 
  )
}



