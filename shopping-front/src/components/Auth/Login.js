import React from 'react';
import { useForm } from 'react-hook-form';


export default function Login({loggedIn, loggingUser, message, logout, omniauth}) {

const { register, handleSubmit } = useForm()



  return (
  <div className='container'>
    <div  className='d-flex flex-md-column align-items-center justify-content-center container-fluid login col-4'>
      <h1 className='row-4'>Login</h1>
      {message ? <h3 className='row-4 error'>{message}</h3> : null }
      <form className='container flex-md-row align-items-center justify-content-center' onSubmit={handleSubmit((data) =>{
       loggingUser(data.email, data.password)
      })}>
      <div className="row-4">
    <label htmlFor='validationCustom01' className="form-label">Email :</label>
    <input {...register('email', {required: true})} placeholder='email' type="email" className="form-control" id="validationCustom01" required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="row-4">
    <label htmlFor="validationCustom02" className="form-label">Password :</label>
    <input {...register('password')} type="password" placeholder='password' className="form-control" id="validationCustom02" required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <button type='submit' className='btn btn-primary btnlogg'>Log-in</button>
  </form>
    </div>
    </div>
  )
}
