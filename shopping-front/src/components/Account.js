import React from 'react';
import { useForm } from 'react-hook-form';


export default function Account({user, editUser, message}) {

  const { register, handleSubmit } = useForm()

  return (
    <div className='container'>
      <div className="container-fluid flex-column align-items-center justify-content-center col-6" >
        <div className="col-10 ">
          <form className='flex row' onSubmit={handleSubmit(data => {
            editUser(data.email, data.password, data.edit_password, data.edit_password_confirmation)
          })}>
            <h2>Account</h2>
            {message ? <h3 className='row-4 error'>{message}</h3> : null }
            <label><strong>{user.email}</strong></label>
            <label htmlFor='password'> Current password :</label>
            <input {...register('password')} />
            <label htmlFor='edit_password'> New password :</label>
            <input {...register('edit_password')} />
            <label htmlFor='edit_password_confirmation'>New password confirmation :</label>
            <input {...register('edit_password_confirmation')} />
            <input type="submit" className='btn btn-primary btnlogg' />
          </form>
        </div> 
      </div>
    </div>
  )
}
