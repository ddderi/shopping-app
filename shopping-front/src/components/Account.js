import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Order from './Order';
import { editUser } from '../requests/RequestUser';
import { fetchOrders } from '../requests/ApiRequest'


export default function Account({ setOrders, setMessage, loggedIn, setTriggered, triggered, orders, user, message }) {

  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate();

  const changeUserInfo = async (data) => {
    try {
      if (data) {
        const changeInfo = await editUser(user.id,
          data.email,
          data.password,
          data.edit_password,
          data.edit_password_confirmation,
          data.manager);
        console.log(changeInfo)
        setMessage(changeInfo.message)
        return changeInfo
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (loggedIn) {
      console.log('trigger')
      fetchOrders(setOrders)
      setTriggered(true)
    } else if (!loggedIn) {
      navigate('/login')
    }
  }, [loggedIn, triggered])

  console.log(loggedIn)

  return (
    <div className='container'>
      <div className="container-fluid flex-column align-items-center justify-content-center col-6" >
        <div className="col-10 ">
          <form className='flex row' onSubmit={handleSubmit(data => {
            changeUserInfo(data)
            reset()
          })}>
            <h2 style={{ textAlign: 'center' }}>Account</h2>
            <h5 style={{ border: '1px solid grey' }}>For safety reasons, updating your manager status, required password replacement</h5>
            {message ? <h3 style={{ textAlign: 'center' }} className='row-4 error'>{message}</h3> : null}
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
            {orders.length > 0 ? orders.map((data, index) => { return <Order key={index} data={data} /> }) : "You never passed any order"}
          </div>
        </div>
      </div>
    </div>


  )
}
