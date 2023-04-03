import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/post/postActions";
import { getPostsError } from "../features/post/postSlice";
import { toast } from "react-toastify";
// import * as yup from "yup";

// const PostSchema = yup.object().shape({
//   PostTitle: yup
//     .string()
//     .required("required")
//     .min(3, "Title Length Should be minimum 3 characters long"),
//   PostContent: yup.string().required("required"),
// });

const initialValuesPost = {
  PostTitle: "",
  PostContent: "",
};

const AdPost = () => {
    const dispatch = useDispatch();
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (error) {
            toast.error(error)
          }

      }, [error]);
    
    
    

    const handleFormSubmit = (e) => {
        const  PostData = {
            PostTitle: e.PostTitle,
            PostContent: e.PostContent
        }
        dispatch(addPost(PostData))
    }

  return (
    <div>
      <h1>Add Post</h1>
      <Formik 
      initialValues={initialValuesPost} 
    //   validationSchema={PostSchema}
       onSubmit={handleFormSubmit}>


        <Form>
          <label htmlFor="PostTitle">Post Title: </label>
          <Field name="PostTitle" type="text" />
          <ErrorMessage name="PostTitle" />
           <br/>
          <label htmlFor="PostContent">Post Content: </label>
          <Field name="PostContent" type="text" />
          <ErrorMessage name="PostContent" />
          <br/> 
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AdPost;
