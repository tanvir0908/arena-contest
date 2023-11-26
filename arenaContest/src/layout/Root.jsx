import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";

export default function Root() {
  return (
    <div>
      {/* react hot toast */}

      <Navbar />
      <Outlet />
    </div>
  );
}
