import axios from 'axios'
const url = 'http://localhost:5001'

import { createAsyncThunk } from '@reduxjs/toolkit'


export const authLogin = createAsyncThunk(
    'user/authLogin',
    async({email, password, toast} , {rejectWithValue}) => {
        const response = await axios.post(`${url}/verifyLogin`, {email, password})

        
    }
)