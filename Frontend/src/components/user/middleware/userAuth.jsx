import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserAuth({ children }) {
  const navigate = useNavigate();
  const token = useSelector((store) => store.user.token);
  console.log(token);
  useEffect(() => {
    if (!token) {
      navigate("/");
    } 
  }, []);

  if(token){
    return children
  }


}

export default UserAuth;
