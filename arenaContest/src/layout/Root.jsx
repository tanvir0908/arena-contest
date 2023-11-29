import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

export default function Root() {
  return (
    <div>
      {/* react hot toast */}

      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
