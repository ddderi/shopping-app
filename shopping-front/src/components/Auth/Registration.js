import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registrationUser } from '../../requests/RequestUser';

export default function Registration({setLoggedIn, setUser, setMessage, loggedIn, message}) {

const navigate = useNavigate()
const { register, handleSubmit } = useForm()

const regNewUser = async (data) => {
if(data){
  const newRegUser = await registrationUser(data.email, 
    data.password, 
    data.password_confirmation,
    data.first_name,
    data.last_name,
    data.street_address_1,
    data.street_address_2,
    data.city,
    data.state,
    data.zipcode)
    setMessage(newRegUser.errors)
    console.log(newRegUser)
    if(newRegUser.status !== 500){
      setUser(newRegUser.user)
      setLoggedIn(true)
      
      setTimeout(() => {
        navigate("/")
        setMessage(newRegUser.message)
      }, 2000)
      
    }
    return newRegUser
}
}





  return (
 
   <div className='container contreg col-6'>
     {message ? message.map((mess, index) => <h3 style={{border: '2px solid black',textAlign: 'center'}} key={index} >{mess}</h3>) : null } 
      <form onSubmit={handleSubmit((data) =>{
        regNewUser(data)
      })} className="row g-3 needs-validation" >
  <div className="col-md-4">
    <label htmlFor='validationCustom01' className="form-label">Email :</label>
    <input {...register('email', {required: true})} placeholder='email' type="email" className="form-control" id="validationCustom01" required/>
    
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom02" className="form-label">Password :</label>
    <input {...register('password')} placeholder='password' className="form-control" id="validationCustom02" required/>
    
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustomUsername" className="form-label">Password confirmation :</label>
    <div className="input-group has-validation">
      <input {...register('password_confirmation', {required: true})} placeholder='password confirmation' className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
      
    </div>
  </div>
  <div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">First name :</label>
    <input {...register('first_name')} placeholder='first name' className="form-control" id="validationCustom03" required/>
    
  </div>

  <div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">Last name :</label>
    <input {...register('last_name')} placeholder='last name' className="form-control" id="validationCustom03" required/>
   
  </div>
  <div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">Address 1 :</label>
    <input {...register('street_address_1')} placeholder='Address' className="form-control" id="validationCustom03" required/>
    
  </div>
  <div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">Address 2 :</label>
    <input {...register('street_address_2')} placeholder='Address' className="form-control" id="validationCustom03" required/>
  </div>
  <div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">City :</label>
    <input {...register('city')} placeholder='city' className="form-control" id="validationCustom03" required/>
  </div>
  <div className="col-md-3">
    <label htmlFor="validationCustom04" className="form-label">State :</label>
    <select {...register('state')} className="form-select" id="validationCustom04" required>
      <option defaultValue disabled value="">Choose...</option>
      <option>ACT</option>
      <option>QLD</option>
      <option>NSW</option>
      <option>WA</option>
      <option>NT</option>
      <option>SA</option>
      <option>VIC</option>
      <option>TAS</option>
    </select>
    <div className="invalid-feedback">
      Please select a valid state.
    </div>
  </div>
  <div className="col-md-3">
    <label htmlFor="validationCustom05" className="form-label">Zip :</label>
    <input {...register('zipcode')} placeholder='Zip code' className="form-control" id="validationCustom05" required/>
  </div>

  <div className="col-12">
    <button className="btn btn-primary" type="submit">Submit registration</button>
   </div> 
 </form>
    </div>
    
  )
}
