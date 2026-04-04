import Login from "./features/Auth/page/Login";
import Register from "./features/Auth/page/Register";
import { createBrowserRouter } from "react-router";
import Feed from "./features/Post/pages/Feed";
import CreatePost from "./features/Post/pages/CreatePost";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Feed/>,
  },
  
  {
    path: "/createpost",
    element: <CreatePost/>,
  },

]);
