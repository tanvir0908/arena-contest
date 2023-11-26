import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root/Root";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
