import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/post/postSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postReducer

})


export const store = configureStore({
    reducer: rootReducer
})

