import React from 'react';

export default function ProductShops({data}) {
  return (
   
        <div className="card col-4 cardproduct" >
          <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUepSBh1189POsTFbg0hbvNhoR_cjByqfL6YpDjMgz&s" alt="Card cap"/>
            <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button className="btn btn-primary">Go somewhere</button>
          </div>
        </div>
     
  )
}
