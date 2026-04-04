import { useContext } from "react";
import { AuthContext } from "../Auth.context";
import { login, register } from "../services/auth.api";

const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  const { user, setUser, loading, setLoading, error, setError } = context;

  const handleRegister = async (username, email, password) => {
    try {
      setLoading(true);
      setError(null);

      // 🔹 Normalize input
      const payload = {
        username: username.trim(),
        email: email.toLowerCase().trim(),
        password,
      };

      const res = await register(
        payload.username,
        payload.email,
        payload.password,
      );
      setUser(res.user);
      return {
        success: true,
        data: res,
      };
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong";

      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = async (identifier, password) => {
    try {
      setLoading(true);
      setError(null);

      // 🔹 Normalize input
      const cleanIdentifier = identifier.trim();
      const cleanPassword = password;

      // 🔹 Basic validation (extra safety)
      if (!cleanIdentifier || !cleanPassword) {
        throw new Error("All fields are required");
      }

      const res = await login(cleanIdentifier, cleanPassword);
      setUser(res.user);

      return {
        success: true,
        data: res,
      };
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Login failed";

      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    handleLogin,
    handleRegister,
    setUser,
  };
};

export default UseAuth;
