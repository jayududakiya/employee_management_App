import { createSlice } from "@reduxjs/toolkit";
import {
  signupUserThunk
} from "../thunk/userInfoThunk";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    user: {},
    userRegisterStatus : "",
    userLoginStatus : "",
    loading: false,
    error: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ------------------create--------------signup----------------------------------------- */
      // .addCase(createUserInfoThunk.pending , (state) => {
      //     state.loading = true
      // })
      // .addCase(createUserInfoThunk.fulfilled , (state,action) => {
      //     console.log('action.payload', action.payload);
      //     state.loading = false
      //     // state.users = action.payload
      // })
      // .addCase(createUserInfoThunk.rejected , (state,action) => {
      //     state.loading = false
      //     state.error = action.payload
      // })
      // /* --------------------------------login----------------------------------------- */
      // .addCase(showUserInfoThunk.pending , (state ) => {
      //     state.loading = true
      // })
      // .addCase(showUserInfoThunk.fulfilled , (state,action) => {
      //     state.loading = false
      //     // state.users = action.payload
      // })
      // .addCase(showUserInfoThunk.rejected , (state,action) => {
      //     state.loading = false
      //     state.error = action.payload
      // })
      /* ----------------------------------signUp thunk ---------------------------------------- */
      .addCase(signupUserThunk.pending, (state) => {
        state.loading = true
        state.error = null;
      })
      .addCase(signupUserThunk.rejected, (state,action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action payload:", action.payload)
        state.loading = false        
        state.userRegisterStatus = action.payload.userStatus 
      })
  }
});

export default userInfoSlice.reducer;
