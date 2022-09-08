import React from 'react';

export default function ProductShops({data}) {
  console.log(data)
  return (
   
        <div className="card" >
          <img className="card-img-top" src={data.image_url} alt="Card cap"/>
            <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
              <p className="card-text">{data.description}</p>
          <button className="btn btn-primary">Go somewhere</button>
          </div>
        </div>
     
  )
}
