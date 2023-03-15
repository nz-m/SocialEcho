import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { getPublicUserAction } from "../../redux/actions/userActions";

const PublicProfile = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.user.publicUserProfile);

  useEffect(() => {
    dispatch(getPublicUserAction(userId));
  }, [dispatch, userId]);

  if (!userProfile) {
    return null;
  }

  const {
    name,
    avatar,
    location: userLocation,
    bio,
    // role,
    interests,
    totalPosts,
    communities,
    totalCommunities,
    JoinedOn,
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
        <p>Joined on {JoinedOn}</p>

        <p>{totalPosts} posts</p>
        <p>{totalCommunities} communities</p>
        <p>{totalFollowing} following</p>
      </div>
      <div className="my-4">
        <p>{postsLast30Days} posts in last 30 days</p>
        <p> in {communities?.length} communities</p>

        {isFollowing ? (
          <>
            <p>
              {`Followed by you and `}
              <span className="font-semibold">{totalFollowers - 1} others</span>
            </p>
            <p>You are following since {followingSince}</p>
          </>
        ) : (
          <p>
            <span className="font-semibold">{totalFollowers} followers</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
