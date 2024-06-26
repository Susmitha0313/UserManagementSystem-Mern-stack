import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:5001/admin";

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async ({ email, pass, toast },{rejectWithValue}) => {
    const Email = email.trim();
    const password = pass.trim();
      const response = await axios.post(`${url}/adminlogin`, {
        Email,
        password,
      });

      console.log(response.data);
      console.log('thunk');
      if (response.data.status === "email") {
         toast.error("Email Not Found", {
          hideProgressBar: true,
          className: "custom-toast-error",
          autoClose: 2000,
          
        });
        return rejectWithValue('email not found')
      } else if (response.data.status === "pass") {
        toast.error("Incorrect Password", {
          hideProgressBar: true,
          className: "custom-toast-error",
          autoClose: 2000,
        });
        return rejectWithValue('incorret password')
      } else {
        
        return response.data;
      }
    }
  
);

export const fetchData=createAsyncThunk(
  'admin/fetchData',
  async()=>{
    const response = await axios.get(`${url}/fetchData`);
    return response.data
  }
)

export const editUser=createAsyncThunk(
  'admin/editUser',
  async({name,userId,toast})=>{
    // console.log(name,userId);
    const response=await axios.post(`${url}/editUser`,{name,userId})

    if (response.data.modifiedCount == 1) {
      console.log('inside modifed count');
      console.log(userId,name);
      return { userId, name }
    } else if (response.data == "Access_denied" || response.data == "authentication_failed") {
      toast.error("Access denied please login again", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
     
    } 
  }
)

export const deleteUser=createAsyncThunk(
  'admin/deleteUser',
  async({userId,toast})=>{
    // console.log(userId);
    const response=await axios.post(`${url}/deleteUser`,{userId})
    console.log(response.data);
    if (response.data.deletedCount == 1) {
      return userId;
    } else if (response.data == "Access_denied" || response.data == "authentication_failed") {
    return  toast.error("Access denied please login again", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
     
    } 
  }
)
