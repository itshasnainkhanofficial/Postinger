import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:8000/api";


// Getting All Posts
export const getPosts = createAsyncThunk("post/get", async (thunkAPI) => {
  try {
    const { data } = await axios.get(`${backendURL}/post`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});


// Getting All posts of a specific user
export const getSpecificPosts = createAsyncThunk(
  "post/getSpecificPosts",
  async (_ , thunkAPI) => {
    try {

      const token = thunkAPI.getState().authState.userToken;


      const config = {
        headers: {
              Authorization: `Bearer ${token}`,
        },
    };
    
      const { data } = await axios.get(
        `${backendURL}/post/postBySpecificUser`,
        config
      );

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



// Adding post
export const addPost = createAsyncThunk(
    "post/addPost",
    async (PostData , thunkAPI) => {
      try {
        const token = thunkAPI.getState().authState.userToken;
  
        console.log("token", token)
  
        const config = {
          headers: {
                Authorization: `Bearer ${token}`,
          },
      };
      
        const { data } = await axios.post(`${backendURL}/post`, PostData,  config);
      

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



// Editing post
export const editPost = createAsyncThunk(
    "post/editPost",
    async (EditPostData , thunkAPI) => {
      try {
        const token = thunkAPI.getState().authState.userToken;
  
        console.log("token", token)
        console.log("EditPostData", EditPostData)
    //    return
  
        const config = {
          headers: {
                Authorization: `Bearer ${token}`,
          },
      };
      
        const { data } = await axios.patch(`${backendURL}/post/${EditPostData._id}`, EditPostData,  config);
      
        console.log("post Data after req", data)

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