import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Userlogin from "./components/user/auth/login";
import UserSignup from "./components/user/auth/register";
import { Provider } from "react-redux";
import configStore from './redux/store.js'
import Home from './pages/user/home.jsx'
import UserAuth from "./components/user/middleware/userAuth.jsx";
import Login from "./pages/admin/Login.jsx";
import Admin from "./pages/admin/Admin.jsx";

function App() {
  return (
    <>
    <Provider store={configStore}>
     <Routes>
      <Route path='/login' element={<Userlogin />}/>
      <Route path='/register' element={<UserSignup />}/>
      <Route path='/' element={<UserAuth><Home /></UserAuth>}/>
      <Route path="/admin" element={<Login />} />
      <Route path="/admin/home" element={<Admin />} />
     </Routes>
     </Provider>
    </>
  );
}

export default App;