import React, { useState } from "react";
import "./adminLogin.css";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminLogin } from "../../redux/adminRedux/adminThunk";
import { Link, useNavigate } from "react-router-dom";



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const trimEmail = email.trim();
      const trimPass = password.trim();
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

      // Log trimmed email and password for debugging
      console.log("Trimmed Email:", trimEmail);
      console.log("Trimmed Password:", trimPass);

      // Check if any fields are empty
      if (trimEmail === "" || trimPass === "") {
        return toast.error("All Fields Are Required", {
          hideProgressBar: true,
          className: "custom-toast-error",
          autoClose: 2000,
        });
      }

      // Validate email format
      if (!emailRegex.test(trimEmail)) {
        return toast.error("Invalid Email", {
          hideProgressBar: true,
          className: "custom-toast-error",
          autoClose: 2000,
        });
      }

      // Log that validation passed
      console.log("Validation passed, dispatching adminLogin...");

      // Dispatch the login action and await the result
      const resultAction = await dispatch(
        adminLogin({ email: trimEmail, password: trimPass, toast })
      );

      // Check if the action was rejected (based on `createAsyncThunk`)
      if (adminLogin.fulfilled.match(resultAction)) {
        const { token } = resultAction.payload;

        // Save the token in localStorage or cookies
        localStorage.setItem("authToken", token);

        // Redirect to admin page
        navigate("/admin/home");
      } else {
        console.error("Login failed", resultAction.payload);
      }
    } catch (error) {
      // Catch unexpected errors in the login flow
      console.error("Unexpected error during login:", error);

      toast.error("An unexpected error occurred. Please try again later.", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="admin-log">
      <ToastContainer />

      <div className="login-container">
        <h2 className="login-title">Admin Login</h2>
        <form className="login-form">
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
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>
          <span className="sign">Sign Up New User?  <Link to={'/register'}>Sign up!</Link></span>
          <span className="sign">Go To User Login?  <Link to={'/login'}>Click here!</Link></span>
        
      </div>
    </div>
  );
};

export default LoginPage;
