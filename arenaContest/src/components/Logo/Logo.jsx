import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Logo() {
  return (
    <div>
      <Link to={"/"} className="flex items-center gap-2">
        <img className="w-10 md:w-12" src={logo} alt="" />
        <p className="text-2xl md:text-3xl font-bold">ArenaContext</p>
      </Link>
    </div>
  );
}
