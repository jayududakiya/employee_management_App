import { createSlice } from "@reduxjs/toolkit";

import { showEmployeesInfoThunk } from "../thunk/employeesInfoThunk";

const employeesInfoSlice = createSlice({
  name: "employeesInfo",
  initialState: {
    employees: [],
    loading: false,
    error: ""
  },
  extraReducers: (builder) => {
    builder
    .addCase(showEmployeesInfoThunk.pending, (state) => {
      state.loading = true;
    })
    .addCase(showEmployeesInfoThunk.fulfilled, (state,action) => {
      console.log('action.payload === employees' , action.payload);
      state.loading = false;
      state.employees = action.payload
    })
    .addCase(showEmployeesInfoThunk.rejected, (state , action) => {
      state.loading = false;
      state.error = action.error;
    })
  }
});

export default employeesInfoSlice.reducer;
