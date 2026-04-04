import React, { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hook/usePost";

const Feed = () => {
  const { handleGetFeed, loading , post } = usePost();
  // console.log(handleGetFeed , loading)

  useEffect(() => {
    handleGetFeed()
  },[]);
  // console.log(post)
  return (
    <div className="feed-wrapper">
      <div className="feed">
        {post?post.map((post) => (
          <Post post={post} />
        )) :null}
      </div>
    </div>
  );
};

export default Feed;
