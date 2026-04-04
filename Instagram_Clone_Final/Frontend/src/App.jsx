import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import AuthContextProvider from "./features/Auth/Auth.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostContextProvider from "./features/Post/post.context";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <PostContextProvider>
          <RouterProvider router={router} />
        </PostContextProvider>
      </AuthContextProvider>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
};

export default App;
