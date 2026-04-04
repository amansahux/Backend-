import React, { useState } from "react";
import "../styles/login.scss";
import { Link, useNavigate } from "react-router";
import UseAuth from "../hooks/UseAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({
    identifier: "", // email OR username
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const { handleLogin, loading, setUser } = UseAuth();

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    // identifier validation (email OR username)
    if (
      !emailRegex.test(form.identifier) &&
      !usernameRegex.test(form.identifier)
    ) {
      newErrors.identifier = "Enter valid email or username";
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Decide type (optional)
      const isEmail = emailRegex.test(form.identifier);

      const payload = isEmail
        ? { email: form.identifier, password: form.password }
        : { username: form.identifier, password: form.password };

      console.log("Login Payload:", payload);

      handleLogin(form.identifier, form.password).then((res) => {
        console.log(res);

        if (loading) {
          toast.info("Logging in ....");
        }
        {
          res.success
            ? toast.success("Logged in successfully 🎉") &&
              navigate("/") &&
              setUser(res.data.user)
            : toast.error(`Login failed ❌ ${res.error}`);
        }

        setForm({
          identifier: "",
          password: "",
        });
      });
    }
  };

  return (
    <div className="login">
      <div className="card">
        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <input
              type="text"
              name="identifier"
              placeholder="Email or Username"
              value={form.identifier}
              onChange={handleChange}
            />
            {errors.identifier && <span>{errors.identifier}</span>}
          </div>

          <div className="inputGroup">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="registerLink">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
