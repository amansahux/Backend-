import React, { useEffect } from "react";

import "../style/feed.scss";
import { usePost } from "../hooks/usePost";
import Post from "../components/Post";
import { useNavigate } from "react-router";
import Nav from "../../shared/components/Nav";

const Feed = () => {
  const { loading, user, feed, HandleGetFeed, HandleLikePost } = usePost();

  const navigate = useNavigate();

  useEffect(() => {
    HandleGetFeed();
  }, []);

  // console.log(feed)
  if (loading || !feed) {

    return (
      <main>
        <h1 style={{ fontSize: "70px" }}>Feed is loading</h1>
      </main>
    );
  }
  return (
    <main className="feed-page">
      <Nav/>
      <div className="feed">
        <div className="posts">
          {feed.map((post) => {
            return (
              <Post
                key={post._id}
                user={post.user}
                post={post}
                Like={HandleLikePost}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
