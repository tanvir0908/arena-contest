import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";

export default function AdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const { isRole, isRoleLoading } = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (user && isRole === "admin") {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
}
