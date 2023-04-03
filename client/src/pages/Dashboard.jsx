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

    

    // if(!userToken){
    //   navigate("/login")
    //  }
 
  
  }, [ dispatch, getPosts])
  
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>
        {/* <div>Welcome {userInfo && userInfo.name}</div> */}
        
      <h1>All Posts</h1>
      {(!isLoading && !error) ? (<div>
        {posts.map( (post) => { 
          return <p key={post._id}>{post.PostTitle}</p>
        })}
      </div>) : (<div>post not availble</div>) }


    </div>
  )
}

export default Dashboard


