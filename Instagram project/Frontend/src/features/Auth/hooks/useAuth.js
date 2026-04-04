import { useContext } from "react"
import { AuthContext } from "../auth.context";
import { login, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { Loading, setLoading, User, setUser, Error, setError ,  } = context;

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const res = await login(username, password);
      setUser(res.user);
      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async (email, usernme, password) => {
    setLoading(true);
    try {
      const res = await register(email, usernme, password);
      setUser(res.user);
      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {handleLogin, handleRegister, User, Loading, Error};
};
