import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="card-header">
          <h3>Login</h3>
        </div>

        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Email"
                id="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                className="form-control"
                placeholder="Password"
                id="password"
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

export default Register;
