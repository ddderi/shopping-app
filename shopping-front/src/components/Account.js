import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Order from './Order';


export default function Account({loggedIn, fetchOrders, triggered, orders, user, editUser, message}) {

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate();

  useEffect(() => {
    if(loggedIn){

    console.log('trigger')
    fetchOrders()
    }else if(!loggedIn){
      navigate('/login')
    }
  }, [orders, triggered])



  return (
    
    
    <div className='container'>
      <div className="container-fluid flex-column align-items-center justify-content-center col-6" >
        <div className="col-10 ">
          <form className='flex row' onSubmit={handleSubmit(data => {
            editUser(data.email, data.password, data.edit_password, data.edit_password_confirmation, data.manager)
          // console.log(data)
          })}>
            <h2 style={{textAlign: 'center'}}>Account</h2>
            <h5 style={{border: '1px solid grey'}}>For safety reasons, updating your manager status, required password replacement</h5>
            {message ? <h3 className='row-4 error'>{message}</h3> : null }
            <label><strong>{user.email}</strong></label>
            <label htmlFor='password'> Current password :</label>
            <input {...register('password')} />
            <label htmlFor='edit_password'> New password :</label>
            <input {...register('edit_password')} />
            <label htmlFor='edit_password_confirmation'>New password confirmation :</label>
            <input {...register('edit_password_confirmation')} />
            
            <label htmlFor='manager'>Manager :</label>
            <input {...register('manager')} type='checkbox' />

            <input type="submit" className='btn btn-primary btnlogg' />
            
          </form>
          <div className='ordercont'>
          {orders.length > 0 ? orders.map((data, index)=> { return <Order key={index} data={data} />}) : "You never passed any order"}
          </div>
        </div> 
      </div>
    </div>
    
   
  )
}
