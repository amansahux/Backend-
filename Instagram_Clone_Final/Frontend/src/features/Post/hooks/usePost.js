import React, { useContext } from "react";
import { postContext } from "../post.context";
import { getFeedPosts } from "../services/post.api";

const usePost = () => {
  const context = useContext(postContext);
  if (!context)
    throw new Error("Post Context must be used within PostContextProvider");
  const { loading, setLoading, error, setError } = context;

  const getPost = async () => {
    const res = await getFeedPosts();
    return res;
  };
  return { getPost, loading, error, setError };
};

export default usePost;
