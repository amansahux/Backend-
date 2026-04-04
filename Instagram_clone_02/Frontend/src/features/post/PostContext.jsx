import React, { createContext, useState } from "react";

export const PostContext = createContext();
export const PostContextProvider = ({ children }) => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [post, setpost] = useState(null);
  return (
    <PostContext.Provider
      value={{ loading, setloading, error, seterror, post, setpost }}
    >
      {children}
    </PostContext.Provider>
  );
};
