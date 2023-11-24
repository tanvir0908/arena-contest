import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);
