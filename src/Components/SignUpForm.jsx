import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";

function SignUpForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    registerError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const validate = () => {
    let errors = {};
    if (!formData.username) errors.username = "Username is required";

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.trim().length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:3001/", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          console.log("res.data", res.data);
          if (res.data === "User Already registered") {
            setErrors((prev) => ({ ...prev, registerError: res.data }));
            console.log("errors.register", errors.register);
          } else {
            navigate("/success");
          }
        })
        .catch((Err) => console.error(Err));
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="form-container">
      {errors.registerError && (
        <div className="top-error">{errors.registerError}</div>
      )}
      <form onSubmit={handleSubmit} className="form-content">
        <h2>Sign Up</h2>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit">SignUp</button>
      </form>
      <div>
        <span>
          Already have an account?
          <button type="submit" onClick={handleLogin} className="nav-btn">
            Log In
          </button>
        </span>
      </div>
    </div>
  );
}

export default SignUpForm;
