import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseAPI = import.meta.env.VITE_JSON_PLACEHOLDER_BASE_API;
const ATLAS_LOCAL_BASE_API = import.meta.env.VITE_ATLAS_LOCAL_BASE_API;

export const showUserInfoThunk = createAsyncThunk(
  "showUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseAPI}/users`);
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      throw new Error("Failed to fetch user info");
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);

export const createUserInfoThunk = createAsyncThunk(
  "createUserInfo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseAPI}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // The server expects JSON data
        },
        body: JSON.stringify(payload)
      });
      if (response.status === 201) {
        console.log("response", response);
        const data = await response.json();
        return data;
      }
      throw new Error("Failed to create new User");
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);

export const signupUserThunk = createAsyncThunk(
  "signupUser",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("payload:", payload);
      const response = await axios.post(
        `${ATLAS_LOCAL_BASE_API}/api/user`,payload);
      if(response.status === 200 && response.statusText === "OK"){
        return response.data;
      }
      throw new Error('Felid To Signup');
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
