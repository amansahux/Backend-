import React, { useState } from "react";
import "../styles/login.scss";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin , user} = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const { identifier, password } = formData;

    if (!identifier) {
      newErrors.identifier = "Required";
    } else if (
      !emailRegex.test(identifier) &&
      !usernameRegex.test(identifier)
    ) {
      newErrors.identifier = "Invalid email or username";
    }

    if (!password) {
      newErrors.password = "Required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "Weak password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    handleLogin(formData.identifier, formData.password).then((res) => {
      console.log(res);
      if (user) {
        navigate("/");
      }
    });
  };

  return  (
    <div className="login-wrapper">
      <form className="glass-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className={`field ${errors.identifier ? "error" : ""}`}>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
          <label>Email or Username</label>
          <span>{errors.identifier}</span>
        </div>

        <div className={`field ${errors.password ? "error" : ""}`}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>

          <div
            className="toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "hide" : "show"}
          </div>

          <span>{errors.password}</span>
        </div>

        <button type="submit">Login</button>

        <p className="footer-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
