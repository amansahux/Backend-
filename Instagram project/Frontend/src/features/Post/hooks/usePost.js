import { useContext } from "react";
import { PostContext } from "../Post.Context";
import { CreatePost, getPost, likePost } from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setLoading, user, setUser, feed, setFeed } = context;

  const HandleGetFeed = async () => {
    setLoading(true);
    try {
      const response = await getPost();
      setFeed(response.posts.reverse());
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const HandleLikePost = async (postId) => {
    try {
      const response = await likePost(postId);

      setFeed((prevFeed) =>
        prevFeed.map((post) =>
          post._id === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: response.likes || post.likes,
              }
            : post,
        ),
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const HandleCreatePost = async (caption, imageFile) => {
    setLoading(true);
    try {
      const res = await CreatePost(caption, imageFile);
      setFeed([res.post, ...feed]);
      return res;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    user,
    feed,
    HandleGetFeed,
    HandleLikePost,
    HandleCreatePost,
  };
};
