import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getPostsError, selectAllPosts } from "../features/post/postSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {editPost} from '../features/post/postActions'
import {getPosts} from '../features/post/postActions'


// import * as yup from "yup";

// const PostSchema = yup.object().shape({
//   PostTitle: yup
//     .string()
//     .required("required")
//     .min(3, "Title Length Should be minimum 3 characters long"),
//   PostContent: yup.string().required("required"),
// });



const EditPost = () => {
  const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const error = useSelector(getPostsError);
    const posts = useSelector(selectAllPosts);

    const existingPost = posts.filter( post => post._id == params.id )

    const {PostTitle, PostContent, _id} = existingPost[0]
  

    const initialValuesPost = {
        PostTitle,
        PostContent,
        _id
      };


    useEffect(() => {

        if (error) {
            toast.error(error)
          }

          dispatch(getPosts())

      }, [error, dispatch, getPosts]);
    
       

    const handleEditPost = (e) => {
        const  PostData = {
            PostTitle: e.PostTitle,
            PostContent: e.PostContent,
            _id 
        }
        dispatch(editPost(PostData))
        navigate("/MyPosts")
    }

  return (
    <div>
      <h1>Edit Post</h1>
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
      {/* <h1>{posts.map((post) => <p key={post._id}>{post.PostTitle}</p>)}</h1> */}
    </div>
  );
};

export default EditPost;
