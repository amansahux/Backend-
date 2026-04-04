import React, { useState } from "react";
import "../styles/Register.scss";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const { email, username, password } = formData;

    if (!email) {
      newErrors.email = "Required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (!username) {
      newErrors.username = "Required";
    } else if (!usernameRegex.test(username)) {
      newErrors.username = "Min 3 chars, no spaces";
    }

    if (!password) {
      newErrors.password = "Required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "6+ chars, 1 letter, 1 number, 1 special char";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = () => {
    const { password } = formData;

    if (password.length < 6) return "Weak";
    if (password.match(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/)) return "Medium";
    if (password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/))
      return "Strong";

    return "Weak";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    handleRegister(formData.username, formData.email, formData.password).then(
      (res) => {
        console.log(res);
        if(res.token){navigate("/")}
        e.target.clear()
        setErrors("")
      },
    );
  };

  return(
    <div className="register-wrapper">
      <form className="glass-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {/* Email */}
        <div className={`field ${errors.email ? "error" : ""}`}>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <span>{errors.email}</span>
        </div>

        {/* Username */}
        <div className={`field ${errors.username ? "error" : ""}`}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Username</label>
          <span>{errors.username}</span>
        </div>

        {/* Password */}
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

        {/* Password Strength */}
        {formData.password && (
          <div className={`strength ${getPasswordStrength().toLowerCase()}`}>
            {getPasswordStrength()} Password
          </div>
        )}

        <button type="submit">Register</button>

        <p className="footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
