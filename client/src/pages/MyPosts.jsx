import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSpecificPosts } from "../features/post/postActions";
import {
  getPostsError,
  getPostsLoadingStatus,
  selectAllPosts,
} from "../features/post/postSlice";
import AdPost from "./AdPost";
const MyPosts = () => {
  const { userToken } = useSelector((state) => state.authState);
  const posts = useSelector(selectAllPosts);
  const error = useSelector(getPostsError);
  const isLoading = useSelector(getPostsLoadingStatus);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }

    dispatch(getSpecificPosts());
  }, [navigate, userToken, dispatch, getSpecificPosts]);

  return (
    <div>
        <AdPost/>
      <h1>Your Posts</h1>

      {posts ? (
        <div>
          {posts.map((p) => (
            <p key={p._id}>{p.PostTitle}</p>
          ))}
        </div>
      ) : (
        <div>No post found</div>
      )}
    </div>
  );
};

export default MyPosts;
