import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/authActions";
import { useEffect } from "react";
import { getJoinedCommunitiesAction } from "../../redux/actions/communityActions";

const Leftbar = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutAction());
  };
  const user = useSelector((state) => state.auth?.userData);
  const joinedCommunities = useSelector(
    (state) => state.community?.joinedCommunities
  );

  useEffect(() => {
    dispatch(getJoinedCommunitiesAction());
  }, [dispatch]);

  const visibleCommunities = joinedCommunities?.slice(0, 5);

  const communityLinks = useMemo(() => {
    return visibleCommunities?.map((community) => ({
      href: `/community/${community.name}`,
      label: community.name,
    }));
  }, [visibleCommunities]);

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
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/saved">Saved</Link>
          <Link to="/following">Following</Link>
          {joinedCommunities ? (
            <div>
              <h3 className="mb-2">Communities you're in</h3>
              <ul>
                {communityLinks.map((communityLink) => (
                  <li key={communityLink.href}>
                    <Link to={communityLink.href}>{communityLink.label}</Link>
                  </li>
                ))}
              </ul>

              <div>
                <Link to="/my-communities">
                  See all ({joinedCommunities.length})
                </Link>
              </div>
            </div>
          ) : (
            <div>Loading communities...</div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex">
            <div>
              <img src={user.avatar} alt="" />
            </div>
            <div>{user.name}</div>
          </div>

          {user && (
            <button onClick={logout} type="button">
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
