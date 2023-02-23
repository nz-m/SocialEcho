import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../actions/authActions";
import { useEffect } from "react";
import { getJoinedCommunitiesAction } from "../../actions/communityActions";

const Leftbar = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutAction());
  };
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(getJoinedCommunitiesAction());
  }, [dispatch]);

  const joinedCommunities = useSelector(
    (state) => state.community.joinedCommunities
  );

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  if (!joinedCommunities) {
    return null;
    // later add a loading spinner
  }

  const communityLinks = joinedCommunities.map((community) => ({
    href: `/community/${community.name}`,
    label: community.name,
  }));

  const links = [
    { href: "/home", label: "Home" },
    { href: "/profile", label: "Profile" },
    { href: "/saved", label: "Saved" },
    {
      href: "#",
      label: "Joined Communities",
      onClick: toggleDropdown,
      dropdown: true,
    },
  ];

  return (
    <div className="w-1/4 h-screen bg-gray-100 sticky top-0">
      <div className="flex flex-col h-full justify-between py-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Logo</h1>
          <h4>
            <div>
              {user && (
                <h1 className="font-bold text-blue-500">Welcome {user.name}</h1>
              )}
            </div>
            ;
          </h4>
        </div>
        <div className="flex flex-col items-start">
          {links.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.label}>
                  <button
                    onClick={link.onClick}
                    className="block py-2 px-4 hover:bg-gray-200"
                  >
                    {link.label} ▼
                  </button>
                  {dropdownVisible && (
                    <div className="flex flex-col items-start">
                      {communityLinks.map((communityLink) => (
                        <Link
                          to={communityLink.href}
                          key={communityLink.href}
                          className="block py-2 px-4 hover:bg-gray-200"
                        >
                          {communityLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <Link
                  to={link.href}
                  key={link.href}
                  className="block py-2 px-4 hover:bg-gray-200"
                >
                  {link.label}
                </Link>
              );
            }
          })}
        </div>
        <div className="flex flex-col items-center justify-center">
          {user && (
            <button
              onClick={logout}
              className="block py-2 px-4 hover:bg-gray-200"
            >
              Logout
            </button>
          )}
          <p className="text-sm">&copy; 2023 SocialEcho</p>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
