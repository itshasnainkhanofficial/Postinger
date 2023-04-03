import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authActions";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, userToken } = useSelector(
    (state) => state.authState
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  useEffect(() => {
    if (error) {
      console.log(error, "Error");
      toast.error(error);
    }
    // redirect user to deshbaord if registration was successful
    if (userToken) {
      navigate("/");
    }
  }, [navigate, userToken, error]);

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
