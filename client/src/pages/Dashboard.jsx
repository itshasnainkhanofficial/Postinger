import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import Spinner from "../components/Spinner"

const Dashboard = () => {
  const {userToken, error, userInfo, isLoading} = useSelector( (state) => state.auth)

  const navigate = useNavigate();
  

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }

    if(!userToken){
      navigate("/login")
     }
 
  
  }, [ userToken, navigate, error])
  
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>
        <div>Welcome {userInfo && userInfo.name}</div>
        
      <h1>All Posts</h1>
      


    </div>
  )
}

export default Dashboard


