import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Dashboard from "../layout/Dashboard";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageContest from "../pages/Dashboard/ManageContest/ManageContest";
import AllContests from "../pages/AllContests.jsx/AllContests";
import AddContest from "../pages/Dashboard/AddContest/AddContest";
import CreatedContests from "../pages/Dashboard/CreatedContests/CreatedContests";
import AdminRoute from "./AdminRoute";
import ContestDetails from "../components/ContestDetails/ContestDetails";

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
        path: "login",
        element: <Login />,
      },
      {
        path: "allContests",
        element: <AllContests />,
      },
      {
        path: "contestDetails/:id",
        element: <ContestDetails />,
        
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      // admin dashboard
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manageContest",
        element: <ManageContest />,
      },
      // moderator dashboard
      {
        path: "addContest",
        element: <AddContest />,
      },
      {
        path: "createdContests",
        element: <CreatedContests />,
      },
    ],
  },
]);
