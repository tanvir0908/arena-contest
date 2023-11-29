import { NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import { FaBook, FaUsers } from "react-icons/fa";
import Logo from "../components/Logo/Logo";

export default function Dashboard() {
  const { isRole } = useRole();
  return (
    <div className="flex">
      <div className="w-1/5 min-h-screen bg-secondary">
        <div className="p-4">
          <Logo />
        </div>
        <hr className="border my-3 w-11/12 border-primary mx-auto" />
        <ul>
          {isRole === "admin" ? (
            <>
              <li>
                <NavLink
                  className={
                    "flex items-center gap-3 p-3 m-2 text-lg font-medium"
                  }
                  to={"/dashboard/manageUsers"}
                >
                  <FaUsers />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    "flex items-center gap-3 p-3 m-2 text-lg font-medium"
                  }
                  to={"/dashboard/manageContest"}
                >
                  <FaBook /> Manage Contests
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
          {/* moderator dashboard */}
          {isRole === "moderator" ? (
            <>
              <li>
                <NavLink
                  className={
                    "flex items-center gap-3 p-3 m-2 text-lg font-medium"
                  }
                  to={"/dashboard/addContest"}
                >
                  <FaUsers />
                  Add Contest
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    "flex items-center gap-3 p-3 m-2 text-lg font-medium"
                  }
                  to={"/dashboard/createdContests"}
                >
                  <FaUsers />
                  My Created Contests
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  className={
                    "flex items-center gap-3 p-3 m-2 text-lg font-medium"
                  }
                  to={"/dashboard/manageContest"}
                >
                  <FaBook /> Contest Submitted Page
                </NavLink>
              </li> */}
            </>
          ) : (
            <></>
          )}
          {isRole === "user" ? (
            <>
              <li>
                <NavLink
                  to={"/dashboard/usersProfile"}
                  className={
                    "flex items-center gap-3 p-3 m-2 text-lg font-medium"
                  }
                >
                  <FaUsers />
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    "flex items-center gap-3 p-3 m-2 text-lg font-medium"
                  }
                  to={"/dashboard/registeredContest"}
                >
                  <FaBook /> My Registered Contests
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    "flex items-center gap-3 p-3 m-2 text-lg font-medium"
                  }
                  to={"/dashboard/winningContest"}
                >
                  <FaBook /> My Winning Contests
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
          <hr className="border my-3 w-11/12 border-primary mx-auto" />

          <li>
            <NavLink
              className={"flex items-center gap-3 p-3 m-2 text-lg font-medium"}
              to={"/"}
            >
              <FaBook /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={"flex items-center gap-3 p-3 m-2 text-lg font-medium"}
              to={"/allContests"}
            >
              <FaBook /> All Contests
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
}
