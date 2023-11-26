import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root/Root";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
