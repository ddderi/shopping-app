import React from 'react'

function Order({data}) {

const date = new Date(data.created_at)

  return (
    <div className='orders'>
        <span>Order number : {data.id}</span><br></br>
        <span>Total : ${data.total}</span><br></br>
        <span>Order passed on : {date.toLocaleDateString()}</span>
    </div>
  )
}

export default Order