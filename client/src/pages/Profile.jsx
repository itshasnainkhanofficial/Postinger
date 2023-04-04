
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from 'react-toastify'

const Profile = () => {
    const { userToken, userInfo, error, isLoading } = useSelector((state) => state.authState);
    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            toast.error(error.message)
          }
      if (!userToken) {
        navigate("/login");
      }

    }, [navigate, userToken]);

    if (isLoading) {
        return <Spinner />
      }
  return (
    <div>
        
        {userInfo ? (
          <div>
          <h1>
            Welcome {userInfo.name}
          </h1>
          <div>
          Email {userInfo && userInfo.email}</div>
          </div>
        ) : (<div>User Not Found :(</div>)}
    </div>
  )
}

export default Profile