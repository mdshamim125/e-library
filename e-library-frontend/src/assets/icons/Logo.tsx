import { Link } from "react-router";
import logo from "../images/logo.jpg";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex justify-center text-blue-600 items-center font-bold text-2xl"
    >
      <img src={logo} className="h-20 w-20 rounded-full p-4" alt="logo-image" />
      <p>E-Library</p>
    </Link>
  );
};

export default Logo;