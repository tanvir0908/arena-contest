import { Outlet } from "react-router-dom";
import Navbar from "../../pages/Shared/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

export default function Root() {
  return (
    <div>
      {/* react hot toast */}
      <Toaster />
      <Navbar />
      <Outlet />
    </div>
  );
}
