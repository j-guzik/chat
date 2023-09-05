import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../store/actions/authAction";
import { useAlert } from "react-alert";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../../store/types/authType";

// import { useTheme } from "@mui/material/styles";
// import {
//   Box,
//   Button,
//   Checkbox,
//   Divider,
//   FormControl,
//   FormControlLabel,
//   FormHelperText,
//   Grid,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   TextField,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );
  console.log(myInfo);

  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [loadImage, setLoadImage] = useState("");

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const register = (e) => {
    const { name, surname, email, password, confirmPassword, image } = state;
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);

    dispatch(userRegister(formData));
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
    <div className="register">
      {/* <Button
        disableElevation
        // disabled={}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="secondary"
      >
        Sign up
      </Button> */}

      <div className="card">
        <div className="card-header">
          <h3>Sign up</h3>
        </div>

        <div className="card-body">
          <form onSubmit={register}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                id="name"
                onChange={inputHandle}
                value={state.name}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="surname"
                className="form-control"
                placeholder="Surname"
                id="surname"
                onChange={inputHandle}
                value={state.surname}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                id="email"
                onChange={inputHandle}
                value={state.email}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                id="password"
                onChange={inputHandle}
                value={state.placeholder}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                id="confirmPassword"
                onChange={inputHandle}
                value={state.confirmPassword}
              />
            </div>

            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage ? (
                    <img src={loadImage} alt="profile" />
                  ) : (
                    <img src="../../../images/profile.png" alt="profile" />
                  )}
                </div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    id="image"
                    onChange={fileHandle}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="Register" className="btn" />
            </div>

            <div className="form-group">
              <span>
                <Link to="/chat/login">I already have an account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
