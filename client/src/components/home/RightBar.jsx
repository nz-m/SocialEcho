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
        <div className="w-3/12 h-screen bg-white sticky top-0">
          {currentLocation !== "/communities" && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">Suggested Communities</h5>
                {notJoinedCommunities?.length === 0 && (
                  <div className="text-center italic text-gray-400">
                    No communities to join. Check back later
                  </div>
                )}
                <ul className="list-group">
                  {visibleCommunities?.map((community) => (
                    <li
                      key={community._id}
                      className="list-group-item d-flex align-items-center"
                    >
                      <img
                        src={community.banner || placeholder}
                        className="h-10 w-10 rounded-full mr-4"
                        alt="community"
                      />
                      <span>{community.name}</span>
                      <button
                        onClick={() => toggleJoinModal(community._id, true)}
                        className="btn btn-primary btn-sm ms-2"
                      >
                        Join
                      </button>
                      <JoinModal
                        show={joinModalVisibility[community._id] || false}
                        onClose={() => toggleJoinModal(community._id, false)}
                        community={community}
                      />
                    </li>
                  ))}
                </ul>
                {remainingCount > 0 && (
                  <MemoizedLink
                    to="/communities"
                    className="text-center block text-blue-500 font-medium mt-2"
                  >
                    See More ({remainingCount})
                  </MemoizedLink>
                )}
              </div>
            </div>
          )}
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Popular Users to Follow</h5>
              {memoizedUsers?.length === 0 && (
                <div className="text-center italic text-gray-400">
                  No users to follow. Check back later
                </div>
              )}
              <ul className="list-group">
                {memoizedUsers?.length > 0 &&
                  memoizedUsers.map((user) => (
                    <li
                      key={user._id}
                      className="list-group-item d-flex justify-content-between"
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
                          <div className="text-gray-500 text-sm">
                            {user.location}
                          </div>
                          <div>Followers: {user.followerCount}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => followUserHandler(user._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        {followLoading[user._id] ? (
                          <LoadingSpinner />
                        ) : (
                          <span>Follow</span>
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
