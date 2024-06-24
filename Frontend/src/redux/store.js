import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userRedux/userSlice";


const configStore=configureStore({
    reducer:{
        user:userSlice,
        admin:adminSlice
    }
    
})

export default configStore
