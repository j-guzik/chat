import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { userLogin } from "../../store/actions/authAction";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../../store/types/authType";

const Login = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(userLogin(state));
  };

  useEffect(() => {
    if (authenticate) {
      navigate("/");
    }
    if (successMessage) {
      alert.success(successMessage);
      dispatch({ type: SUCCESS_MESSAGE_CLEAR });
    }
    if (error) {
      error.map((err) => alert.error(err));
      dispatch({ type: ERROR_CLEAR });
    }
  }, [successMessage, error]);

  return (
    <div className="login">
      <div className="card">
        <div className="card-header">
          <h3>Login</h3>
        </div>

        <div className="card-body">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                id="email"
                value={state.email}
                onChange={inputHandle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                id="password"
                value={state.password}
                onChange={inputHandle}
              />
            </div>

            <div className="form-group">
              <input type="submit" value="Login" className="btn" />
            </div>

            <div className="form-group">
              <span>
                <Link to="/chat/register"> Don't have account? </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
