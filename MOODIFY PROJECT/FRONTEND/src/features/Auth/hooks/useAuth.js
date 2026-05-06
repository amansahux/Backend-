import React from "react";
import { useContext } from "react";
import { AuthContext } from "../Auth.context";
import { getMe, login, logout, register } from "../services/Auth.api";
import { useEffect } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (identifier, password) => {
    try {
      setLoading(true);
      const res = await login(identifier, password);
      setUser(res.user);
      return res;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    const res = register(username, email, password);
    setUser(res.user);
    setLoading(false);
    return res;
  };

  const handleGetMe = async () => {
  try {
      setLoading(true);
    const res = await getMe();
    setUser(res.user);
    setLoading(false);
    return res;
  } catch (error) {
    console.error(error)
  }
  };

  const handleLogout = async () => {
    setLoading(true);
    const res = await logout();
    setUser(null);
    setLoading(false);
    return res;
  };

  useEffect(() => {
    handleGetMe();
  }, []);
  return {
    handleLogin,
    handleRegister,
    handleGetMe,
    handleLogout,
    user,
    loading,
  };
};

export default useAuth;
