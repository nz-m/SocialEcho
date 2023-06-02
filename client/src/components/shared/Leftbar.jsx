import { useMemo, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getJoinedCommunitiesAction } from "../../redux/actions/communityActions";
import {
  HiOutlineHome,
  HiOutlineUserCircle,
  HiOutlineRectangleStack,
  HiOutlineTag,
} from "react-icons/hi2";
import { IoIosPeople } from "react-icons/io";

const Leftbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.userData);
  const joinedCommunities = useSelector(
    (state) => state.community?.joinedCommunities
  );

  useEffect(() => {
    dispatch(getJoinedCommunitiesAction());
  }, [dispatch]);

  const visibleCommunities = useMemo(() => {
    return joinedCommunities?.slice(0, 5);
  }, [joinedCommunities]);

  const communityLinks = useMemo(() => {
    return visibleCommunities?.map((community) => ({
      href: `/community/${community.name}`,
      label: community.name,
    }));
  }, [visibleCommunities]);

  return (
    <div className="leftbar">
      <div className="flex flex-col justify-start items-center">
        <div className="flex flex-col items-start gap-4 w-full p-5">
          <Link
            className="flex items-center gap-2 text-lg font-medium hover:text-primary"
            to="/home"
          >
            <HiOutlineHome className="text-xl" />
            <p>Home</p>
          </Link>
          <Link
            className="flex items-center gap-2 text-lg font-medium hover:text-primary"
            to="/profile"
          >
            <HiOutlineUserCircle className="text-xl" />
            <p>Profile</p>
          </Link>
          <Link
            className="flex items-center gap-2 text-lg font-medium hover:text-primary"
            to="/saved"
          >
            <HiOutlineTag className="text-xl" />
            <p>Saved</p>
          </Link>

          {user && user.role === "general" && (
            <Link
              className="flex items-center gap-2 text-lg font-medium hover:text-primary"
              to="/following"
            >
              <HiOutlineRectangleStack className="text-xl" />
              <p>Following</p>
            </Link>
          )}

          <hr className="w-full my-4 border-gray-300" />

          {communityLinks && communityLinks.length > 0 ? (
            <div>
              <h3
                className="mb-4 text-gray-700 font-semibold
                flex items-center justify-start w-full"
              >
                Communities
                <span className="ml-3">
                  <IoIosPeople />
                </span>
              </h3>
              <ul className="w-full text-gray-500">
                {communityLinks.map((communityLink) => (
                  <li key={communityLink.href}>
                    <Link
                      className="flex items-center hover:bg-gray-100 hover:rounded-md px-2 py-1"
                      to={communityLink.href}
                    >
                      {communityLink.label}
                    </Link>
                  </li>
                ))}

                <li>
                  <Link
                    className="flex items-center text-sm font-semibold hover:bg-gray-100 hover:rounded px-2 py-1"
                    to="/my-communities"
                  >
                    See all ({joinedCommunities.length})
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div>No communities found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Leftbar);
