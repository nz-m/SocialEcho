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
import { BsPersonPlusFill } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
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
    const visibleCommunities = notJoinedCommunities?.slice(0, 4);
    const remainingCount = Math.max((notJoinedCommunities?.length || 0) - 4, 0);
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
        <div className="w-3/12 h-[86vh] bg-white sticky top-20 right-0 shadow-2xl shadow-[#F3F8FF] px-6 py-6 my-5 rounded-lg">
          {currentLocation !== "/communities" && (
            <div className="">
              <div className="flex items-end justify-between mb-4">
                <h5 className="font-semibold text-sm">
                  Suggested Communities
                </h5>
                {remainingCount > 0 && (
                  <MemoizedLink
                    to="/communities"
                    className=" text-blue-500 font-medium flex text-xs"
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
                   No communities to join. Check back later
                </div>
              )}
              <ul className="flex flex-col gap-3 ">
                {visibleCommunities?.map((community) => (
                  <li
                    key={community._id}
                    className="flex items-center justify-between bg-white shadow-2xl shadow-[#f2f5fc]  border border-slate-100 px-2 py-1 rounded-lg"
                  >
                    <div className="flex items-center">
                      <img
                        src={community.banner || placeholder}
                        className="h-8 w-8 rounded-full mr-4"
                        alt="community"
                      />
                      <div className="text-base font-medium flex flex-col">
                        <p>  {community.name}</p>
                      
                       <p className="text-xs text-gray-400">3.2k</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleJoinModal(community._id, true)}
                      className=" text-primary border border-dashed border-blue-500
                        hover:bg-primary 
                         rounded-md py-1 px-2 text-sm font-semibold group transition duration-300"
                    >
                      <p className="group-hover:text-white flex items-center  gap-2">
                      
                        Join
                        <IoIosPeople className="inline-block text-lg" />
                      </p>
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
          
          <hr className="my-3"/>
              <h5 className=" mb-4 text-sm font-semibold">
                Popular Users to Follow
              </h5>
              {memoizedUsers?.length === 0 && (
                <div className="text-center italic text-gray-400">
                  No users to follow. Check back later
                </div>
              )}
              <ul className="flex flex-col gap-3">
                {memoizedUsers?.length > 0 &&
                  memoizedUsers.map((user) => (
                    <li key={user._id} className="flex justify-between items-center gap-5 bg-white shadow-2xl shadow-[#f2f5fc]  border border-slate-100 px-2 py-1 rounded-lg">
                      <div className="flex justify-content-between items-center">
                        <img
                          className="h-8 w-8 rounded-full mr-4"
                          src={user.avatar}
                          alt={user.name}
                        />
                        <div>
                          <MemoizedLink
                            to={`/user/${user._id}`}
                            className="font-medium text-base line-clamp-1"
                          >
                            {user.name}
                          </MemoizedLink>
                          <div className="text-xs text-slate-400">Followers: {user.followerCount}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => followUserHandler(user._id)}
                        className="text-primary border border-dashed border-blue-500
                        hover:bg-primary 
                         rounded-md py-1 px-2 text-sm font-semibold group transition duration-300"
                      >
                        {followLoading[user._id] ? (
                          <LoadingSpinner />
                        ) : (
                          <p className="group-hover:text-white flex items-center gap-2">
                           
                            Follow
                            <BsPersonPlusFill className="inline-block text-lg" />
                          </p>
                        )}
                      </button>
                    </li>
                  ))}
              </ul>
            
        
        </div>
      )}
    </>
  );
};

export default RightBar;
