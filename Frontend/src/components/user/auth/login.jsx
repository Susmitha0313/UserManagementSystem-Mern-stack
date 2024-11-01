import React, { useEffect, useState } from "react";
import "./login.css";
import Navbar from "./navbar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { authLogin } from "../../../redux/userRedux/userThunk";

function Userlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user.data);

  useEffect(() => {
    if (userData) {
      navigate('/');
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email === '' || password=== '' ) {
      
      return toast.error("Enter email and Password",{ hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 })
    } else {
      console.log(email,password);
    dispatch(authLogin({email, password, toast}))
    }
    
  };

  return (
    <>
      <div className="log">
      <ToastContainer/>
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
               
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
           
          </form>
          <span className="sign">Don't have an account? <Link to={'/register'}>Sign up!</Link></span>
          <span className="sign">Are you the Admin?  <Link to={'/admin'}>Click here!</Link></span>
        
        </div>
       
      </div>
    </>
  );
}

export default Userlogin;
