import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from './postActions'

const initialState = {
    isLoading: false,
    posts: [],
    error: ''
}


export const postSlice = createSlice({
    name: 'post',
    initialState,
//       reducers: {
//     reset: () => initialState,
//   },
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


// The selectors make it easier so that if the nature of your state changes, you can update all of them in one place.

export const selectAllPosts  = state => state.postState.posts
export const getPostsError  = state => state.postState.error
export const getPostsLoadingStatus = state => state.postState.isLoading
