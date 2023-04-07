import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const backendURL = "http://localhost:8000/api/auth";
const backendURL = "https://postinger.vercel.app/api/auth";

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {

      const { data } = await axios.post(
        `${backendURL}/register`,
        { name, email, password }
      );

      // store user's token in local storage
      localStorage.setItem("userToken", data.token);

      // store user's details in local storage
      localStorage.setItem("userDetails", JSON.stringify(data)); // as localstorage only stores string so we have to convert from object to string
      

      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {

      const { data } = await axios.post(
        `${backendURL}/login`,
        { email, password }
      ); 
      // store user's token in local storage

      localStorage.setItem("userToken", data.token);

      // store user's details in local storage
      localStorage.setItem("userDetails", JSON.stringify(data)); // as localstorage only stores string so we have to convert from object to string

      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }

      //   const message =
      //   (error.response && error.response.data && error.response.data.message) ||
      //   error.message ||
      //   error.toString()
      //  return thunkAPI.rejectWithValue(message)
    }
  }
);
