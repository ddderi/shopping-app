import axios from "axios";

const axiosInstance = axios.create({baseURL: "http://localhost:3000"})

// export async function loggingUser(email, password, setUser){
//     try{
//         const result = await axiosInstance.post('/login', {
//             user: {
//             email: email,
//             password: password
//             }
//         }, { withCredentials: true });
       
//     }catch(err){
//         console.log(err)
//     }
// }



export async function registeringUser(email, password){
    try{
        const result = await axiosInstance.post('/login', {
            user: {
            email: email,
            password: password
            }
        }, { withCredentials: true });
        return console.log("regist res", result.data)
    }catch(err){
        console.log(err)
    }
}