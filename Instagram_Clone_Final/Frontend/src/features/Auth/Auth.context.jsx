import React, { createContext, useState } from "react";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  return (
    <div>
      <AuthContext.Provider
        value={{ user, setUser, loading, setLoading, error, setError }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;
