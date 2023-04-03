import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getPostsError, selectAllPosts } from "../features/post/postSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {editPost} from '../features/post/postActions'
// import * as yup from "yup";

// const PostSchema = yup.object().shape({
//   PostTitle: yup
//     .string()
//     .required("required")
//     .min(3, "Title Length Should be minimum 3 characters long"),
//   PostContent: yup.string().required("required"),
// });



const EditPost = () => {
    const params = useParams()
    const dispatch = useDispatch();
    const error = useSelector(getPostsError);
    const posts = useSelector(selectAllPosts);
    console.log(posts)
    const existingPost = posts.filter( post => post._id == params.id )
    const {PostTitle, PostContent, _id} = existingPost[0]

    const initialValuesPost = {
        PostTitle,
        PostContent,
        _id
      };


    useEffect(() => {
        console.log(PostTitle)
        console.log(PostContent)
        console.log(existingPost)


        if (error) {
            toast.error(error)
          }

      }, [error]);
    
       

    const handleEditPost = (e) => {
        const  PostData = {
            PostTitle: e.PostTitle,
            PostContent: e.PostContent,
            _id 
        }
        dispatch(editPost(PostData))
    }

  return (
    <div>
      <h1>Add Post</h1>
      <Formik 
      initialValues={initialValuesPost} 
    //   validationSchema={PostSchema}
       onSubmit={handleEditPost}>


        <Form>
          <label htmlFor="PostTitle">Post Title: </label>
          <Field name="PostTitle" type="text" />
          <ErrorMessage name="PostTitle" />
           <br/>
          <label htmlFor="PostContent">Post Content: </label>
          <Field name="PostContent" type="text" />
          <ErrorMessage name="PostContent" />
          <br/> 
          <button type="submit"> Edit Post </button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditPost;
