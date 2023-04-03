import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotJoinedCommunitiesAction } from "../../redux/actions/communityActions";
import {
  getPublicUsersAction,
  followUserAndFetchData,
} from "../../redux/actions/userActions";
import placeholder from "../../assets/placeholder.png";
import { Link, useNavigate } from "react-router-dom";
import ModeratorProfile from "../moderator/ModeratorProfile";
import JoinModal from "../modals/JoinModal";
import LoadingSpinner from "../spinner/LoadingSpinner";
import {HiOutlineUserPlus} from 'react-icons/hi2'
const RightBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [joinModalVisibility, setJoinModalVisibility] = useState({});

  const toggleJoinModal = (communityId, visible) => {
    setJoinModalVisibility((prev) => ({
      ...prev,
      [communityId]: visible,
    }));
  };

  const currentUser = useSelector((state) => state.auth?.userData);
  const recommendedUsers = useSelector((state) => state.user?.publicUsers);
  const memoizedUsers = useMemo(() => recommendedUsers, [recommendedUsers]);

  const currentUserIsModerator = currentUser?.role === "moderator";
  useEffect(() => {
    dispatch(getNotJoinedCommunitiesAction());
    dispatch(getPublicUsersAction());
  }, [dispatch]);

  const notJoinedCommunities = useSelector(
    (state) => state.community?.notJoinedCommunities
  );

  const [visibleCommunities, remainingCount] = useMemo(() => {
    const visibleCommunities = notJoinedCommunities?.slice(0, 5);
    const remainingCount = Math.max((notJoinedCommunities?.length || 0) - 5, 0);
    return [visibleCommunities, remainingCount];
  }, [notJoinedCommunities]);

  const [followLoading, setFollowLoadingState] = useState({});

  const followUserHandler = useCallback(
    async (toFollowId) => {
      setFollowLoadingState((prevState) => ({
        ...prevState,
        [toFollowId]: true,
      }));

      await dispatch(followUserAndFetchData(toFollowId, currentUser));

      setFollowLoadingState((prevState) => ({
        ...prevState,
        [toFollowId]: false,
      }));

      navigate(`/user/${toFollowId}`);
    },
    [dispatch, currentUser, navigate]
  );

  const MemoizedLink = memo(Link);

  if (!notJoinedCommunities) {
    return null;
    // later add a loading spinner
  }

  const currentLocation = window.location.pathname;

  return (
    <>
      {currentUserIsModerator ? (
        <ModeratorProfile />
      ) : (
        <div className="w-4/12 h-[84vh] bg-white sticky top-24 left-0 shadow-2xl shadow-[#F3F8FF] px-6 py-6 my-5 rounded-lg">
          {currentLocation !== "/communities" && (
            
              <div className="">
                <div className="flex items-end justify-between mb-6">
                <h5 className="font-semibold text-base">Suggested Communities</h5>
                {remainingCount > 0 && (
                  <MemoizedLink
                    to="/communities"
                    className=" text-blue-500 font-medium flex "
                  >
                    See More 
                    <p className="bg-primary px-2 py-2 w-5 h-5 flex justify-center items-center -mt-3 rounded-full text-white text-[10px]">
                    {remainingCount}
                  </p>
                   
                  </MemoizedLink>
                )}
                </div>
               
                {notJoinedCommunities?.length === 0 && (
                  <div className="text-center italic text-gray-400">
                  😢  No communities to join. Check back later
                  </div>
                )}
                <ul className="flex flex-col gap-3">
                  {visibleCommunities?.map((community) => (
                    <li
                      key={community._id}
                      className="flex items-start justify-between"
                    >
                      <div className="flex">
                      <img
                        src={community.banner || placeholder}
                        className="h-10 w-10 rounded-full mr-4"
                        alt="community"
                      />
                      <span className="text-lg font-medium">{community.name}</span>
                      </div>
                  
                      <button
                        onClick={() => toggleJoinModal(community._id, true)}
                        className="px-2 py-1 border border-primary text-primary rounded-md flex gap-1 justify-between items-center hover:bg-primary group transition duration-500"
                      >
                        <p className="group-hover:text-white">Join</p>
                        <HiOutlineUserPlus className="group-hover:text-white"/>
                      </button>
                      <JoinModal
                        show={joinModalVisibility[community._id] || false}
                        onClose={() => toggleJoinModal(community._id, false)}
                        community={community}
                      />
                    </li>
                  ))}
                </ul>
              
              </div>
           
          )}
          <div className="">
            <div className="">
              <h5 className=" my-5 text-base font-semibold">Popular Users to Follow</h5>
              {memoizedUsers?.length === 0 && (
                <div className="text-center italic text-gray-400">
                  No users to follow. Check back later
                </div>
              )}
              <ul className="flex flex-col gap-5">
                {memoizedUsers?.length > 0 &&
                  memoizedUsers.map((user) => (
                    <li
                      key={user._id}
                      className="flex justify-between"
                    >
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full mr-4"
                          src={user.avatar}
                          alt={user.name}
                        />
                        <div>
                          <MemoizedLink
                            to={`/user/${user._id}`}
                            className="font-medium"
                          >
                            {user.name}
                          </MemoizedLink>
                        
                          <div>Followers: {user.followerCount}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => followUserHandler(user._id)}
                        className="px-2 border border-primary text-primary rounded-md  hover:bg-primary group transition duration-500"
                      >
                        {followLoading[user._id] ? (
                          <LoadingSpinner />
                        ) : (
                          <p className="group-hover:text-white flex items-center gap-2">Follow
                        <HiOutlineUserPlus className="group-hover:text-white"/></p>
                        )}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightBar;
