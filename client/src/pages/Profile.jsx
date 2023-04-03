
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const { userToken, userInfo } = useSelector((state) => state.authState);
    const navigate = useNavigate()

    useEffect(() => {
      if (!userToken) {
        navigate("/login");
      }

    }, [navigate, userToken]);


  return (
    <div>
        
        <h1>Welcome {userInfo && userInfo.name}</h1>
        
        <div>Email {userInfo && userInfo.email}</div>
    </div>
  )
}

export default Profile