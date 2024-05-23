import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, selectError } from "../redux/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:3001/login", {
          username: formData.username,
          password: formData.password,
        })
        .then((res) => {
          if (res.data === "success") {
            navigate("/success");
          } else {
            dispatch(setError(res.data));
          }
        })
        .catch((Err) => console.error(Err));
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="form-container">
      {error && <div className="top-error">{error}</div>}
      <form onSubmit={handleSubmit} className="form-content">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div>
        <span>
          Create a new account.
          <button type="submit" onClick={handleSignUp} className="nav-btn">
            Sign Up
          </button>
        </span>
      </div>
    </div>
  );
}

export default Login;
