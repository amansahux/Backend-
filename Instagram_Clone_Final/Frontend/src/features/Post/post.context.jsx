import React, { createContext, useState } from "react";

export const postContext = createContext();
const PostContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  return (
    <postContext.Provider value={{ loading, setLoading, error, setError }}>
      {children}
    </postContext.Provider>
  );
};

export default PostContextProvider;
