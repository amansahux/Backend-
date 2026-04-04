import React, { useEffect, useState } from "react";
import Post from "../components/Posts";
import "../styles/Feed.scss";
import usePost from "../hooks/usePost";

const Feed = () => {
  const { loading, error, getPost } = usePost();
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    const res = await getPost();
    // console.log(res);
    if (res.success) {
      setPosts(res.posts);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className="feed-wrapper">
      <div className="feed">
        {posts
          ? posts.map((post) => <Post key={post._id} post={post} />)
          : null}
      </div>
    </div>
  );
};

export default Feed;
