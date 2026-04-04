import React, { useRef, useState } from "react";
import "../style/createpost.scss";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef();

  const { loading, HandleCreatePost } = usePost();

  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const file = postImageInputFieldRef.current.files[0];
    const res = await HandleCreatePost(caption, file);
    console.log(res);
    navigate("/");
  };

  if (loading) {
    return (
      <main>
        <h1 style={{ fontSize: "70px" }}>Creating Post....</h1>
      </main>
    );
  }
  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create post</h1>
        <form onSubmit={HandleSubmit}>
          <label className="post-image-label" htmlFor="postImage">
            Select image
          </label>
          <input
            ref={postImageInputFieldRef}
            hidden
            type="file"
            name="postImage"
            id="postImage"
          />
          <input
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            type="text"
            name="caption"
            id="caption"
            placeholder="Enter Caption"
          />
          <button className="button primary-button">create post</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
