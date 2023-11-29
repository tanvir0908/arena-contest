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
import ModeratorRoute from "./ModeratorRoute";
import ContestDetails from "../components/ContestDetails/ContestDetails";
import Home from "../pages/Home/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Payment from "../pages/Payment/Payment";
import RegisteredContest from "../pages/Dashboard/RegisteredContest/RegisteredContest";
import WinningContest from "../pages/Dashboard/WinningContest/WinningContest";
import Profile from "../pages/Dashboard/Profile/Profile";
import UpdateContest from "../pages/Dashboard/UpdateContest/UpdateContest";
import ContestSubmitted from "../pages/Dashboard/ContestSubmitted/ContestSubmitted";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/contest/${params.id}`),
      },
      {
        path: "payment/:id",
        element: <Payment />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/contest/${params.id}`),
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
        element: (
          <AdminRoute>
            <ManageContest />
          </AdminRoute>
        ),
      },
      // moderator dashboard
      {
        path: "addContest",
        element: (
          <ModeratorRoute>
            <AddContest />
          </ModeratorRoute>
        ),
      },
      {
        path: "createdContests",
        element: (
          <ModeratorRoute>
            <CreatedContests />
          </ModeratorRoute>
        ),
      },
      {
        path: "updateContest/:id",
        element: (
          <ModeratorRoute>
            <UpdateContest />
          </ModeratorRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/contest/${params.id}`),
      },
      {
        path: "submittedContest/:id",
        element: (
          <ModeratorRoute>
            <ContestSubmitted />
          </ModeratorRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/contest/${params.id}`),
      },
      // users dashboard
      {
        path: "usersProfile",
        element: <Profile />,
      },
      {
        path: "registeredContest",
        element: <RegisteredContest />,
      },
      {
        path: "winningContest",
        element: <WinningContest />,
      },
    ],
  },
]);
