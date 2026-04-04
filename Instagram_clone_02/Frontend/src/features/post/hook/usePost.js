import { useContext } from "react";
import { PostContext } from "../PostContext";
import { getFeed } from "../services/Post.api";

export const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setloading, error, seterror, post, setpost } = context;

  const handleGetFeed = async () => {
    setloading(true);
    try {
      const response = await getFeed();
      setpost(response.posts);
      console.log("Feed fetched succesfully");
    } catch (error) {
      throw error;
    } finally {
      setloading(false);
    }
  };
  return{handleGetFeed , loading , post}
};
