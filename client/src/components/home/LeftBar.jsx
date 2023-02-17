import React from "react";
import { Link } from "react-router-dom";

const Leftbar = () => {
  return (
    <div className="flex flex-col h-full w-20 p-4 bg-gray-800">
      <div className="flex items-center justify-center h-16 w-full">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
      </div>
      <div className="flex flex-col flex-grow mt-4 text-white">
        <Link to="/" className="mb-2 - hover:text-gray-400">
          Home
        </Link>
        <Link to="/profile" className="mb-2 text-white hover:text-gray-400">
          Profile
        </Link>
        <Link to="/saved" className="text-white hover:text-gray-400">
          Saved
        </Link>

        <Link to="/community">Community</Link>
        <Link to="/community">gfdgs</Link>
        <Link to="/community">Community</Link>
        <Link to="/community">Community</Link>
        <Link to="/community">Community</Link>
      </div>
    </div>
  );
};

export default Leftbar;
