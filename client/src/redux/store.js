import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/post/postSlice'

const rootReducer = combineReducers({
    authState: authReducer,
    postState: postReducer

})


export const store = configureStore({
    reducer: rootReducer
})

