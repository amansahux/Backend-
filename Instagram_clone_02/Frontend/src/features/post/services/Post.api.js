import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

export const getFeed = async () => {
  try {
    const response = await API.get("/feed");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
