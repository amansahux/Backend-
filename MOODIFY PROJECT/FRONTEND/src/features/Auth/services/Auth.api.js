import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const register = async (username, email, password) => {
  const response = await API.post("/register", { username, email, password });
  return response.data;
};

export const login = async (identifier, password) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

  const payload = isEmail
    ? { email: identifier, password }
    : { username: identifier, password };

  const response = await API.post("/login", payload);
  return response.data;
};

export const getMe = async () => {
  const response = await API.get("/get-me");
  return response.data;
};

export const logout = async () => {
  const response = await API.get("/logout");
  return response.data;
};
