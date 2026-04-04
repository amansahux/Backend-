import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import AuthcontextProvider from "./features/Auth/Auth.context";

const App = () => {
  return (
    <>
      <AuthcontextProvider>
        <RouterProvider router={router} />
      </AuthcontextProvider>
    </>
  );
};

export default App;
