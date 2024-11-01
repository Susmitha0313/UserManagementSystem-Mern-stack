import { createSlice } from "@reduxjs/toolkit";
import {adminLogin,editUser,fetchData,deleteUser} from '../adminRedux/adminThunk'

const token=localStorage.getItem('adminToken')?localStorage.getItem('adminToken'):null
const userData=localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):[]

const adminSlice =  createSlice({
    name : 'admin',
    initialState : {
        token : token,
        userData : userData
    } ,reducers:{
        Logout:(state,action)=>{
            localStorage.removeItem('adminToken')
            localStorage.removeItem('userData')

            state.token=null
            state.userData=[]
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(adminLogin.fulfilled,(state,action)=>{
            const {token,userData}=action.payload;
            
            localStorage.setItem('adminToken',token)
            localStorage.setItem('userData',JSON.stringify(userData))

            state.token=token
            state.userData=userData

        })
        .addCase(fetchData.fulfilled,(state,action)=>{
            const {data}=action.payload
            localStorage.setItem('userData',JSON.stringify(data))
            state.userData=data
        })
        .addCase(editUser.fulfilled,(state,action)=>{
            const {name,userId}=action.payload

            state.userData = state.userData.map((user) => user._id == userId ? { ...user, name: name } : user);
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            const userId=action.payload
            state.userData=state.userData.filter((user)=>user._id!==userId)

        })
            
    }
})


export const { Logout } = adminSlice.actions;

export default adminSlice.reducer;