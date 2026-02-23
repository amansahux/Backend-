import { useState } from "react";
import { createContext } from "react";
import { login, register, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(false);

  const handleLogin = async (username, password) => {
    setloading(true);
    try {
      const response = await login(username, password);
      setuser(response.user);
      return response;
    } catch (err) {
      throw err;
    } finally {
      setloading(false);
    }
  };

  const handleRegister = async (email, username, password) => {
    setloading(true);
    try {
      const response = await register(email, username, password);
      setuser(response.user);
      return response;
    } catch (err) {
      throw err;
    } finally {
      setloading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
}
