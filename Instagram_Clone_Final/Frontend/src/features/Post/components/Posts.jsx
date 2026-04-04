import React from "react";

const Post = ({ post }) => {
  //
  const { postImage, caption, isLiked, user, likeCount } = post;
  //   console.log(postImage, caption, isLiked, user, likeCount);

  return (
    <div className="post">
      {/* Header */}
      <div className="post-header">
        <div className="user">
          {/* <img src={post.avatar} alt="" /> */}
          <div>
            <h5>{user.username}</h5>
            <span>India , jharkhand</span>
          </div>
        </div>
        <div className="more">•••</div>
      </div>

      {/* Image */}
      <div className="post-img">
        <img src={postImage} alt="" />
      </div>

      {/* Actions */}
      <div className="post-actions">
        <div className="left">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
           fill ={isLiked? "red" : "none"}
        // fill="red"
          >
            <path d="M20.8 4.6c-1.5-1.6-4-1.6-5.5 0L12 7.8l-3.3-3.2c-1.5-1.6-4-1.6-5.5 0-1.6 1.6-1.6 4.1 0 5.7l3.3 3.3L12 21l5.5-7.4 3.3-3.3c1.6-1.6 1.6-4.1 0-5.7z" />
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </div>

      {/* Likes */}
      <div className="likes">{likeCount} likes</div>

      {/* Caption */}
      <div className="caption">
        <strong>{user.username}</strong> {caption}
      </div>
    </div>
  );
};

export default Post;
