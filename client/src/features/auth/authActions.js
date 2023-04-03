
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:8000/api/auth";

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const {data} = await axios.post(
        `${backendURL}/register`,
        { name, email, password },
        config
      );

      // store user's token in local storage
      localStorage.setItem("userToken", data.token);

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
    //  return rejectWithValue(message)
    // }
    }
  }
);




export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    // instead of separete i want to send it object
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const {data} = await axios.post(
        `${backendURL}/login`,
        {  email, password },
        config
      ); // instead of separete i want to send it object
      // store user's token in local storage

      localStorage.setItem("userToken", data.token);

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
