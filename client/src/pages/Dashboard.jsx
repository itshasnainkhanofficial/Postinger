import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import Spinner from "../components/Spinner"
import {getPosts} from '../features/post/postActions'
import {selectAllPosts, getPostsError, getPostsLoadingStatus} from '../features/post/postSlice'



const Dashboard = () => {
  // const {posts, error, isLoading} = useSelector( (state) => state.postState)
  const posts = useSelector(selectAllPosts)
  const error = useSelector(getPostsError)
  const isLoading = useSelector(getPostsLoadingStatus)  
  const dispatch = useDispatch();

  useEffect(() => {

    if (error) {
      toast.error(error.message)
    }

    dispatch(getPosts())

    
  }, [ dispatch, getPosts])
  
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>
        
        
      <h1>All Posts</h1>

      {posts.length > 0 ? (
        <div>
          {posts.map((p) => (
            <div key={p._id} style={{backgroundColor: "#f1f1f1", border: "1px solid black"}} >
              <p>Date: {new Date(p.createdAt).toLocaleString('en-US')}</p>
              <p>{p.PostTitle}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Post Not Available :(</div>
      )}


    </div>
  )
}

export default Dashboard


