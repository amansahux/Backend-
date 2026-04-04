import { createBrowserRouter } from "react-router";
import Register from "./features/Auth/pages/Register";
import Login from "./features/Auth/pages/Login";
import Feed from "./features/Post/pages/Feed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
