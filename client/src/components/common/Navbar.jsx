import Logo from "../../assets/SocialEcho.png";
import { Link } from "react-router-dom";
import Search from "./Search";
import { memo } from "react";

const Navbar = () => {
  return (
    <div className="lg:px-40 mx-auto sticky top-0 left-0">
      <div className="flex justify-between items-center bg-white rounded-md px-10">
        <Link to="/" className="w-36 h-full object-contain">
          <img src={Logo} alt="logo" />
        </Link>
        <Search />
      </div>
    </div>
  );
};

export default memo(Navbar);
