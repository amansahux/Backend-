import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { handleRegister, User, Loading, Error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleRegister(email, username, password);
    console.log(res);
    navigate("/login");
  };

  if (Loading) {
    return (
      <main>
        <h1>Loading.....</h1>
      </main>
    );
  }
  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
            />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
            />
            <button className="button primary-button">Register</button>
          </form>
          <p>
            Already have an account ?{" "}
            <Link to={"/login"}>Login to account.</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
