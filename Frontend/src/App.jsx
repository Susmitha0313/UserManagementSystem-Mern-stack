import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Userlogin from "./components/user/auth/login";

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Userlogin />}></Route>
     </Routes>
    </>
  );
}

export default App;