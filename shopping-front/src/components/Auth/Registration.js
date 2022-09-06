import React from 'react';
import { useForm } from 'react-hook-form';

export default function Registration({registrationUser, message}) {

  const { register, handleSubmit } = useForm()

  return (
  // <div>
  //     <h1>Registration</h1>
  //       {message ? <h3>{message}</h3> : null }
  //     <form onSubmit={handleSubmit((data) =>{
  //       registrationUser(data.email, 
  //         data.password, 
  //         data.password_confirmation,
  //         data.first_name,
  //         data.last_name,
  //         data.street_address_1,
  //         data.street_address_2,
  //         data.city,
  //         data.state,
  //         data.zipcode)
  //     })}> 
  //      <label  htmlFor='email'>Email :</label>
  //     <input {...register('email', {required: true})} type="email" placeholder='email'/>
  //     <label  htmlFor='password'>password :</label>
  //     <input {...register('password', {required: true})} placeholder='password' />
  //     <label  htmlFor='password'>password confirmation :</label>
  //     <input {...register('password_confirmation', {required: true})} placeholder='password confirmation' />
  //     <label  htmlFor='first_name'>First name :</label>
  //     <input {...register('first_name')} placeholder='first name' />
  //     <label  htmlFor='last_name'>Last name :</label>
  //     <input {...register('last_name')} placeholder='last name' />
  //     <label  htmlFor='street_address_1'>Address 1 :</label>
  //     <input {...register('street_address_1')} placeholder='Address' />
  //     <label  htmlFor='street_address_2'>Address 2 :</label>
  //     <input {...register('street_address_2')} placeholder='Address' />
  //     <label  htmlFor='city'>city :</label>
  //     <input {...register('city')} placeholder='city' />
  //     <label  htmlFor='state'>State :</label>
  //     <input {...register('state')} placeholder='state' />
  //     <label  htmlFor='zipcode'>Zip code :</label>
  //     <input {...register('zipcode')} placeholder='Zip code' />
  //     <input type='submit' />
  //     </form>
  //     </div>
   <div className='container contreg col-6'>
     {message ? message.map((mess, index) => <h3 key={index} >{mess}</h3>) : null } 
     {console.log(message)} 

      <form onSubmit={handleSubmit((data) =>{
        registrationUser(data.email, 
          data.password, 
          data.password_confirmation,
          data.first_name,
          data.last_name,
          data.street_address_1,
          data.street_address_2,
          data.city,
          data.state,
          data.zipcode)
      })} className="row g-3 needs-validation" >
  <div className="col-md-4">
    <label htmlFor='validationCustom01' className="form-label">Email :</label>
    <input {...register('email', {required: true})} placeholder='email' type="email" className="form-control" id="validationCustom01" required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom02" className="form-label">Password :</label>
    <input {...register('password')} placeholder='password' className="form-control" id="validationCustom02" required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustomUsername" className="form-label">Password confirmation :</label>
    <div className="input-group has-validation">
      <input {...register('password_confirmation', {required: true})} placeholder='password confirmation' className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
      <div className="invalid-feedback">
        Please choose a username.
      </div>
    </div>
  </div>
  <div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">First name :</label>
    <input {...register('first_name')} placeholder='first name' className="form-control" id="validationCustom03" required/>
    <div className="invalid-feedback">
      Please provide a valid city.
    </div>
  </div>

  <div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">Last name :</label>
    <input {...register('last_name')} placeholder='last name' className="form-control" id="validationCustom03" required/>
    <div className="invalid-feedback">
      Please provide a valid city.
    </div>
  </div>
  <div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">Address 1 :</label>
    <input {...register('street_address_1')} placeholder='Address' className="form-control" id="validationCustom03" required/>
    <div className="invalid-feedback">
      Please provide a valid city.
    </div>
  </div>
  <div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">Address 2 :</label>
    <input {...register('street_address_2')} placeholder='Address' className="form-control" id="validationCustom03" required/>
    <div className="invalid-feedback">
      Please provide a valid city.
    </div>
  </div>




  <div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">City :</label>
    <input {...register('city')} placeholder='city' className="form-control" id="validationCustom03" required/>
    <div className="invalid-feedback">
      Please provide a valid city.
    </div>
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
    <div className="invalid-feedback">
      Please provide a valid zip.
    </div>
  </div>

  <div className="col-12">
    <button className="btn btn-primary" type="submit">Submit registration</button>
   </div> 
 </form>
    </div>
    
  )
}
