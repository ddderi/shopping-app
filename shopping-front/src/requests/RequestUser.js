import axios from "axios";

const axiosInstance = axios.create({baseURL: "http://localhost:3000"})


export async function loggingUser(email, password){
    try{
        const result = await axiosInstance.post('/login', {
            user: {
            email: email,
            password: password
            }
        }, { withCredentials: true });
        return result.data
    }catch(error){
        console.log(error)
    }
}


export async function registrationUser(email, password, 
    password_confirmation, 
    first_name, last_name, 
    street_address_1, 
    street_address_2, 
    city, 
    state, 
    zipcode ){
        try{
            const result = await axiosInstance.post("/users", {
                user: {
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation,
                    first_name: first_name,
                    last_name: last_name,
                    address_attributes: {
                    street_address_1: street_address_1,
                    street_address_2: street_address_2,
                    city: city,
                    state: state,
                    zipcode: zipcode}
                  } 
            }, { withCredentials: true });
            return result.data
        }catch(error){
            console.log(error)
        }
}

export async function logout(){
    try{
        const result = await axiosInstance.delete('/logout', {withCredentials: true})
        return result.data
    
    }catch(error){
        console.log(error)
    }
}

export async function editUser(id, email, 
    password, 
    edit_password, 
    edit_password_confirmation, 
    manager){
        try{
   const result = await axiosInstance.patch(`/users/${id}`, 
   {user: {
    email: email,
    password: password,
    edit_password: edit_password,
    edit_password_confirmation: edit_password_confirmation, 
    manager: manager
  }}, {withCredentials: true})
    return result.data
}catch(error){
    console.log(error)
}}

