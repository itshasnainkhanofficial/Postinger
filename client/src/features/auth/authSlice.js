import { createSlice } from '@reduxjs/toolkit'
import {login, register} from "./authActions";

// initialize userToken from local storage
const user = localStorage.getItem("userToken");

const userToken = user ? user : null

const initialState = {
  isLoading: false,
  userInfo: {}, // for user object
  error: null,
  userToken, // for storing the JWT
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      state.isLoading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.userInfo = action.payload
        state.userToken = action.payload.token
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.userInfo = action.payload
        state.userToken = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }

})

export default authSlice.reducer;

export const { logout } = authSlice.actions