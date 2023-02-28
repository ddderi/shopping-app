import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loggingUser } from "../../requests/RequestUser";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setUser,
  setError,
  logout,
} from "../../redux/authSlice.jsx";
import "firebase/auth";

export default function Login({ setLoggedIn, setMessage, message }) {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendNewUser = async (user) => {
    try {
      if (user) {
        const addUser = await loggingUser(user.email, user.password);

        if (addUser.status === "created") {
          setLoggedIn(true);
          setMessage(addUser.message);
          // setUser(addUser.user);
          setTimeout(() => {
            navigate("/");
          }, 2000);
          return addUser;
        } else if (addUser.status === "unconnected") {
          setMessage(addUser.message);
          return addUser;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logInWithGoogle = async (e) => {
    try {
      e.preventDefault();
      const authGoogle = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
      console.log(authGoogle);
      if (authGoogle) {
        window.localStorage.setItem("auth", "true");
        dispatch(
          setUser({
            userLogged: true,
            user: authGoogle.additionalUserInfo.profile.name,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

      return authGoogle;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container contrelog">
      <div className="d-flex flex-md-column align-items-center justify-content-center container-fluid login col-4">
        <h1 className="row-4">Login</h1>
        {message ? <h3 className="row-4 error">{message}</h3> : null}
        <form
          className="container flex-md-row align-items-center justify-content-center"
          onSubmit={handleSubmit((data) => {
            sendNewUser(data);
            reset();
          })}
        >
          <div className="row-4">
            <label htmlFor="validationCustom01" className="form-label">
              Email :
            </label>
            <input
              {...register("email", { required: true })}
              placeholder="email"
              type="email"
              className="form-control"
              id="validationCustom01"
              required
            />
          </div>
          <div className="row-4">
            <label htmlFor="validationCustom02" className="form-label">
              Password :
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="password"
              className="form-control"
              id="validationCustom02"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btnlogg">
            Log-in
          </button>
          <button
            onClick={(e) => logInWithGoogle(e)}
            type="submit"
            className="btn btn-primary btnlogg"
          >
            Google email auth
          </button>
        </form>
      </div>
    </div>
  );
}
