import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
        </div>

        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                id="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                name="surname"
                className="form-control"
                placeholder="Surname"
                id="surname"
              />
            </div>

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
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="text"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                id="confirmPassword"
              />
            </div>

            <div className="form-group">
              <div className="file-image">
                <div className="image"></div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    id="image"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="Register" className="btn" />
            </div>

            <div className="form-group">
              <span>
                <Link to="/chat/login"> Login Your Account </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
