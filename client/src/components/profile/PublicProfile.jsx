import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import {
  getPublicUserAction,
  getPublicUsersAction,
  unfollowUserAction,
} from "../../redux/actions/userActions";

const PublicProfile = () => {
  // Get user ID from the URL
  const location = useLocation();
  const userId = useMemo(
    () => location.pathname.split("/")[2],
    [location.pathname]
  );

  const dispatch = useDispatch();

  // Get public user profile and follow status from the Redux store
  const userProfile = useSelector((state) => state.user.publicUserProfile);
  const isUserFollowing = useSelector((state) => state.user.isFollowing);

  // Fetch public user profile and follow status on mount or when follow status changes
  useEffect(() => {
    dispatch(getPublicUserAction(userId));
  }, [dispatch, userId, isUserFollowing]);

  // Handle unfollowing a user
  const handleUnfollow = (userId) => {
    dispatch(unfollowUserAction(userId)).then(() => {
      dispatch(getPublicUsersAction());
    });
  };

  // Return null if user profile is not available
  if (!userProfile) {
    return null;
  }

  // Destructure user profile data
  const {
    name,
    avatar,
    location: userLocation,
    bio,
    role,
    interests,
    totalPosts,
    // communities, use later to show communities
    totalCommunities,
    joinedOn,
    totalFollowers,
    totalFollowing,
    isFollowing,
    followingSince,
    postsLast30Days,
  } = userProfile;

  return (
    <div className="w-6/12 mx-auto">
      <div className="flex items-center justify-center">
        <img
          className="h-32 w-32 rounded-full object-cover mr-4"
          src={avatar}
          alt="Profile"
        />
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-gray-500">{userLocation}</p>
          {role === "moderator" ? (
            <p className="text-sky-700 text-center text-sm font-semibold bg-sky-200 rounded-md py-1 px-2">
              Moderator
            </p>
          ) : null}
        </div>
      </div>
      <div className="my-4">
        <p>{bio}</p>
      </div>
      <div className="flex flex-wrap">
        {interests &&
          interests.map((interest) => (
            <span
              key={interest}
              className="bg-gray-200 text-gray-800 text-sm font-semibold rounded-full py-1 px-2 mr-2 mb-2"
            >
              {interest}
            </span>
          ))}
      </div>
      <div className="my-4">
        <p>Joined on {joinedOn}</p>

        <p>{totalPosts} posts</p>
        <p>
          {totalCommunities === 0
            ? "Not a member of any communities"
            : totalCommunities === 1
            ? "1 community"
            : `${totalCommunities} communities`}
        </p>
        <p>{totalFollowing} following</p>
      </div>
      <div className="my-4">
        <p>{postsLast30Days} posts in last 30 days</p>

        {isFollowing && role !== "moderator" ? (
          <>
            {totalFollowers === 1 ? (
              <p>Followed by you</p>
            ) : (
              <p>
                {`Followed by you and `}
                <span className="font-semibold">
                  {totalFollowers - 1} others
                </span>
              </p>
            )}
            <p>You are following since {followingSince}</p>
            <button
              onClick={() => handleUnfollow(userId)}
              type="button"
              className="bg-white text-red-500 border border-red-500 rounded-full py-1 px-4 text-sm font-semibold"
            >
              Unfollow
            </button>
          </>
        ) : (
          <p>
            {role === "moderator" ? null : totalFollowers === 1 ? (
              <span className="font-semibold">{totalFollowers} follower</span>
            ) : (
              <span className="font-semibold">{totalFollowers} followers</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
