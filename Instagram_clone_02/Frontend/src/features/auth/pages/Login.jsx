import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.scss";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [useUsername, setUseUsername] = useState(false);
  const [errors, setErrors] = useState({});
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();
  const { handleLogin, loading } = useAuth();

  const validate = (data) => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!useUsername) {
      if (!emailRegex.test(data.email)) {
        newErrors.email = "Enter a valid email address";
      }
    } else {
      if (!usernameRegex.test(data.username)) {
        newErrors.username =
          "Username must be 3-20 characters (letters, numbers, underscore)";
      }
    }

    if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "Password must be 8+ chars with uppercase, lowercase & number";
    }

    return newErrors;
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { email, username, password };
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // const payload = useUsername ? { username, password } : { email, password };

    handleLogin(username, password).then((res) => {
      console.log(res);
      navigate("/");
    });
  };
  return (
    <main className="auth">
      ``
      <div className="form-container">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>
          {!useUsername ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </>
          ) : (
            <>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                value={username}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </>
          )}

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">Login</button>
        </form>

        <div className="switch-mode">
          {!useUsername ? (
            <span onClick={() => setUseUsername(true)}>
              Login with username instead
            </span>
          ) : (
            <span onClick={() => setUseUsername(false)}>
              Login with email instead
            </span>
          )}
        </div>

        <div className="register-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
