import { createAsyncThunk } from "@reduxjs/toolkit";

const baseAPI = import.meta.env.VITE_JSON_PLACEHOLDER_BASE_API; 

export const  showEmployeesInfoThunk = createAsyncThunk('showEmployeesInfo' , async (_,{rejectWithValue}) => {
    try {
        const response = await fetch(`${baseAPI}/employee`);
        if(response.status === 200){
            console.log('response', response);
            const data = response.json();
            return data 
        }
        throw new Error('Failed to fetch Employees info')
    } catch (error) {
        return rejectWithValue(error.message || 'An unknown error occurred')
    }
})