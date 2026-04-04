import React, { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [Loading, setLoading] = useState(false);
  const [User, setUser] = useState(null);
  const [Error, setError] = useState(false);

  return (
    <AuthContext.Provider
      value={{ Loading, setLoading, User, setUser, Error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
