import React, { createContext, useState } from "react";

export const PostContext = createContext();
export const PostContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [feed, setFeed] = useState(null);
  return (
    <PostContext.Provider
      value={{ loading, setLoading, user, setUser, feed, setFeed }}
    >
      {children}
    </PostContext.Provider>
  );
};
