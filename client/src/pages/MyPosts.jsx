import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSpecificPosts, deletePost } from "../features/post/postActions";
import { BsPencilSquare } from "react-icons/Bs";
import { AiFillDelete } from "react-icons/Ai";
import {
  getPostsError,
  getPostsLoadingStatus,
  selectAllPosts,
} from "../features/post/postSlice";
import AdPost from "./AdPost";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const MyPosts = () => {
  const { userToken } = useSelector((state) => state.authState);
  const posts = useSelector(selectAllPosts);
  const error = useSelector(getPostsError);
  const isLoading = useSelector(getPostsLoadingStatus);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }

    if (!userToken) {
      navigate("/login");
    }

    dispatch(getSpecificPosts());
    
  }, [navigate, userToken, dispatch, getSpecificPosts]);


  const clickHandler = (id) => {
    dispatch(deletePost(id))
  }


  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <AdPost />

      <h1>Your Posts</h1>

      {posts.length > 0 ? (
        <div>
          {posts.map((p) => (
            <div key={p._id} style={{backgroundColor: "#f1f1f1", border: "1px solid black"}} >
              <p>Date: {new Date(p.createdAt).toLocaleString('en-US')}</p>
              <p>{p.PostTitle}</p>
              <Link to={`/api/post/${p._id}`}>
                <BsPencilSquare /> Update
              </Link>
              <span style={{cursor: "pointer"}} onClick={() => clickHandler(p._id)}><AiFillDelete /> Delete</span>
            </div>
          ))}
        </div>
      ) : (
        <div>You have not posted yet :(</div>
      )}
    </div>
  );
};

export default MyPosts;
