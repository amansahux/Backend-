import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});
export const register = async (email, username, password) => {
  try {
    const response = await API.post("/register", {
      email,
      username,
      password,
    });
    return response.data;
  } catch (err) {
    throw new err();
  }
};
export const login = async (username, password) => {
  try {
    const response = await API.post("/login", { username, password });
    return response.data;
  } catch (err) {
    throw new err();
  }
};

export const getMe = async () => {
  try {
    const response = await API.get("/get-me");
    return response.data;
  } catch (err) {
    throw new err();
  }
};
