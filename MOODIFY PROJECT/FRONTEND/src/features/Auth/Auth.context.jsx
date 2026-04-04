import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();
const AuthcontextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthcontextProvider;
