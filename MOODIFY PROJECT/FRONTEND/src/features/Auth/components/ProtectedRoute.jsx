import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1 style={{ fontSize: "60px", textAlign: "center", marginTop: "20px" }}>Loading...</h1>;
  }

  if (!user && loading) {
    return <Navigate to="/login" />;
  }
  if (user){
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
