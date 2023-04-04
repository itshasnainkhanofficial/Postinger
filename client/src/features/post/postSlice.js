import { createSlice } from "@reduxjs/toolkit";
import { addPost, editPost, getPosts, getSpecificPosts, deletePost } from './postActions'

const initialState = {
    isLoading: false,
    posts: [],
    error: ''
}


export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Getting All posts not protected
        .addCase(getPosts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload,
            state.isLoading = false,
            state.error = ''
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })

        // Getting All posts of a specific user protected
        .addCase(getSpecificPosts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getSpecificPosts.fulfilled, (state, action) => {
            state.posts = action.payload,
            state.isLoading = false,
            state.error = ''
        })
        .addCase(getSpecificPosts.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })

        // Adding Post
        .addCase(addPost.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addPost.fulfilled, (state, action) => {
            // state.posts = action.payload,
            state.posts.push(action.payload), // because of array
            state.isLoading = false,
            state.error = ''
        })
        .addCase(addPost.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })

        // Editing Post Protected
        .addCase(editPost.pending, (state) => {
            state.isLoading = true
        })
        .addCase(editPost.fulfilled, (state, action) => {
            const {_id, PostTitle, PostContent} = action.payload
            const existingPost = state.posts.find( (post) => post._id === _id )
            if(existingPost){
                existingPost.PostTitle = PostTitle,
                existingPost.PostContent = PostContent
            }
        })
        .addCase(editPost.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })

        // Deleting Post Protected
        .addCase(deletePost.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.isLoading = false
            state.posts = state.posts.filter( 
                (post) => post._id !== action.payload.id
             )
        })
        .addCase(deletePost.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })
    }
})




export default postSlice.reducer;
// export const { reset } = postSlice.actions // to export from reducer if needed

// The selectors make it easier so that
// if the nature of your state changes,
// you can update all of them in one place.

export const selectAllPosts  = state => state.postState.posts
export const getPostsError  = state => state.postState.error
export const getPostsLoadingStatus = state => state.postState.isLoading