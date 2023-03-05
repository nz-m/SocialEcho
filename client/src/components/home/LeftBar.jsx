import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/authActions";
import { useEffect } from "react";
import { getJoinedCommunitiesAction } from "../../redux/actions/communityActions";

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
    { href: "/#", label: "Saved" },
    {
      href: "#",
      label: "Joined Communities",
      onClick: toggleDropdown,
      dropdown: true,
    },
  ];

  return (
    <div className="w-3/12 h-screen bg-white sticky top-0">
      <div className="flex flex-col h-full justify-between py-8 pr-7">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl">Site Logo</h1>
          <h4>
            <div>
              {user && <h1 className="font-bold text-blue-500">{user.name}</h1>}
            </div>
          </h4>
        </div>
        <div className="flex flex-col items-center">
          {links.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.label}>
                  <button
                    onClick={link.onClick}
                    className="block py-2 px-4 hover:bg-[#E6F7FF] hover:rounded-md hover:text-[#000] text-right hover:font-bold"
                  >
                    {link.label} ▼
                  </button>
                  {dropdownVisible && (
                    <div className="flex flex-col items-center">
                      {communityLinks.map((communityLink) => (
                        <Link
                          to={communityLink.href}
                          key={communityLink.href}
                          className="block py-2 px-4 hover:bg-[#E6F7FF] hover:rounded-md hover:text-[#000] text-right"
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
                  className="block py-2 px-4 hover:bg-[#E6F7FF] hover:rounded-md hover:text-[#000] hover:font-bold text-right"
                >
                  {link.label}
                </Link>
              );
            }
          })}
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex">
            <div>
              <img src={user.avatar} alt="" />
            </div>
            <div>{user.name}</div>
          </div>

          {user && (
            <button
              onClick={logout}
              type="button"
              className="inline-block rounded bg-danger px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]"
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
