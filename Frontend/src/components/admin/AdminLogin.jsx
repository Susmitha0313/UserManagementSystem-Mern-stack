import React, { useState } from 'react';
import './adminLogin.css';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminLogin } from '../../redux/adminRedux/adminThunk';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault();
    const trimEmail=email.trim()
    const trimPass=password.trim()
     const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if(trimEmail === '' || trimPass === '') {
        return toast.error('All Fields Are Required', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
    } else if (!emailRegex.test(trimEmail)) {
        return toast.error('Invalid Email', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
    } else {
        dispatch(adminLogin(email  , password, toast))
    }
  };

  return (
    <div className="admin-log">
        <ToastContainer />

   
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>
      <form className="login-form" >
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button" onSubmit={handleLogin}>Login</button>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
