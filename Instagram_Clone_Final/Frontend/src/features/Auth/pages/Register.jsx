import React, { useState } from "react";
import "../styles/register.scss";
import { Link, useNavigate } from "react-router";
import UseAuth from "../hooks/UseAuth";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { user, handleRegister, loading, error } = UseAuth();
  // console.log(user, handleRegister, loading, error)
  const [errors, setErrors] = useState({});

  // Regex patterns
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!usernameRegex.test(form.username)) {
      newErrors.username =
        "Username must be 3-20 characters (letters, numbers, underscore)";
    }

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!passwordRegex.test(form.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form Data:", form);
      // backend logic later
      handleRegister(form.username, form.email, form.password).then((res) => {
        console.log(res);
        if (loading) {
          toast.info("Registering....");
        }
        {
          res.success
            ? toast.success("Registered successfully 🎉") && navigate("/login")
            : toast.error(`Registration failed ❌ ${res.error}`);
        }
      });
    }
    e.target.reset();
  };

  return (
    <div className="register">
      <div className="card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && <span>{errors.username}</span>}
          </div>

          <div className="inputGroup">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
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

          <button type="submit">Register</button>
        </form>

        <p className="loginLink">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
