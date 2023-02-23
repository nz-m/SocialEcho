import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SignIn from "../auth/SignIn";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../actions/authActions";

const Leftbar = () => {
  const links = [
    { href: "/home", label: "Home" },
    { href: "/profile", label: "Profile" },
    { href: "/saved", label: "Saved" },
    { href: "/signin", label: "Sign in" },
    { href: "/signup", label: "Signup" },
  ];

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="w-1/3 h-screen bg-gray-100 sticky top-0">
      <div className="flex flex-col h-full justify-between py-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Logo</h1>
        </div>
        <div className="flex flex-col items-start">
          {links.map((link) => (
            <Link
              to={link.href}
              key={link.href}
              className="block py-2 px-4 hover:bg-gray-200"
            >
              {link.label}
            </Link>
          ))}

          <button onClick={logout}> Logout</button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">&copy; 2023 SocialEcho</p>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
