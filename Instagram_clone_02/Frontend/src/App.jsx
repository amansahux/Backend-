import React from "react";
import AppRoutes from "./AppRoutes";
import "./features/shared/style.scss";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { PostContextProvider } from "./features/post/PostContext.jsx";
const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRoutes />
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
