import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../styles/form.scss";
import { useAuth } from "../hooks/useAuth.js";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, User, Loading, Error } = useAuth();
//   console.log(handleLogin, User, Loading, Error);
const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleLogin(username, password);
    console.log(res);
    navigate("/")
  };

     if (Loading) {
        return (<main>
            <h1>Loading.....</h1>
        </main>)
    }
  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              onInput={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
            />
            <input
              onInput={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
            />
            <button className="button primary-button">Login</button>
          </form>
          <p>
            Don't have an account ? <Link to={"/register"}>Create One.</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
