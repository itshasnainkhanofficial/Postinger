import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const backendURL = 'http://localhost:8000/api'


export const getPosts = createAsyncThunk("post/get",
    async ( thunkAPI ) => {
      try {
        
        const {data} = await axios.get(`${backendURL}/post`);
        return data;
  
      } catch (error) {
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        } else {
          return thunkAPI.rejectWithValue(error.message);
        }

      }
    }
  );