import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {TiDocumentText} from 'react-icons/Ti'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.authState);

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Postinger</Link>
      </div>
      <ul>
        {userToken ? (
          <>
          <li>
            <Link to="/MyPosts">
              <TiDocumentText /> My Posts
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <CgProfile /> Profile
            </Link>
          </li>
            <li>
            
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
          
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
