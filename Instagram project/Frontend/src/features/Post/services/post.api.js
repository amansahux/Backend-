import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const getPost = async () => {
  const response = await API.get("/posts/feed");
  return response.data;
};

export const likePost = async (postId) => {
  const response = await API.post(`/posts/like/${postId}`);
  return response.data;
};

export const CreatePost = async (caption, imageFile) => {
  const formData = new FormData();
  formData.append("caption", caption);
  formData.append("image", imageFile);
  const response = await API.post("/posts/", formData);
  return response.data;
};
