import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const login = async (username, password) => {
  const response = await API.post("/login", { username, password });
  return response.data;
};
export const register = async (email, username, password) => {
  const response = await API.post("/register", { email, username, password });
  return response.data;
};

export const getMe = async () => {
  const response = await API.get("/getme");
  return response.data;
};
