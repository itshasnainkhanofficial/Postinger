import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:8000/api/'

const initialState = {
    isLoading: false,
    posts: [],
    error: ''
}


export const getPosts = createAsyncThunk('post/get',  () => {
    return axios.get(API_URL+'post').then( (res) =>  res.data)
    .catch( (error) => error.message)
        
})



export const postSlice = createSlice({
    name: 'post',
    initialState,
      reducers: {
    reset: (state) => initialState,
  },
    extraReducers: (builder) => {
        builder
        .addCase(getPosts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload,
            state.isLoading = false,
            state.error = ''
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.posts = '',
            state.isLoading = false,
            state.error = action.payload
        })
    }
})

export default postSlice.reducer;