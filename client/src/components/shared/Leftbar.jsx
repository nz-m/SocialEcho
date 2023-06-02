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
import { HiOutlineUserGroup } from "react-icons/hi2";
import { CgCommunity } from "react-icons/cg";

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
            <div className="w-full">
              <div
                className="flex items-center justify-between "
              >
                <div className="flex gap-1 text-lg font-medium items-center ">
                <HiOutlineUserGroup  className=" text-xl"/>
                Communities 
                </div>
               
                <Link
                    className="flex relative items-center text-sm font-medium text-primary mr-4"
                    to="/my-communities"
                  >
                    See all 
                    <p className="absolute -top-3 -right-5 text-white text-xs bg-primary w-5 h-5 rounded-full flex justify-center items-center"> {joinedCommunities.length}</p>
                   
                  </Link>
              </div>
              <ul className="w-full mt-3">
                {communityLinks.map((communityLink) => (
                  <li key={communityLink.href}>
                    <Link
                      className="flex items-center hover:text-primary text-gray-600 text-lg font-medium gap-2 py-2 hover:rounded-md"
                      to={communityLink.href}
                    >
                     
                      {communityLink.label}
                     
                    </Link>
                  </li>
                ))}

               
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
