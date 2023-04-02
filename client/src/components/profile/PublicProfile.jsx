import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  getPublicUserAction,
  getPublicUsersAction,
  unfollowUserAction,
  followUserAction,
} from "../../redux/actions/userActions";
import PublicPost from "./PublicPost";
import LoadingSpinner from "../spinner/LoadingSpinner";
const PublicProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [followLoading, setFollowLoading] = useState(false);
  const [unfollowLoading, setUnfollowLoading] = useState(false);

  const userProfile = useSelector((state) => state.user?.publicUserProfile);
  const isUserFollowing = useSelector((state) => state.user?.isFollowing);
  const isModerator = useSelector(
    (state) => state.auth?.userData?.role === "moderator"
  );

  const publicUserId = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(getPublicUserAction(publicUserId));
  }, [dispatch, isUserFollowing, publicUserId]);

  const handleUnfollow = async (publicUserId) => {
    setUnfollowLoading(true);
    await dispatch(unfollowUserAction(publicUserId));
    await dispatch(getPublicUsersAction());
    setUnfollowLoading(false);
  };

  const handleFollow = async (publicUserId) => {
    setFollowLoading(true);
    await dispatch(followUserAction(publicUserId));
    await dispatch(getPublicUsersAction());
    setFollowLoading(false);
  };

  if (!userProfile) {
    return null;
  }

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
    commonCommunities,
  } = userProfile;

  if (!userProfile) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-6/12 mx-auto">
      <button
        className="bg-gray-200 text-gray-800 text-sm font-semibold rounded-full py-1 px-2 mr-2 mb-2"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
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
        {commonCommunities?.length === 0 ? (
          <p>You have no communities in common.</p>
        ) : (
          <p>
            You both are members of{" "}
            {commonCommunities?.slice(0, 2).map((c, index) => (
              <React.Fragment key={c._id}>
                <Link
                  className="text-sky-700 font-bold hover:underline"
                  to={`/community/${c.name}`}
                >
                  {c.name}
                </Link>
                {index === 0 && commonCommunities.length > 2 ? ", " : ""}
                {index === 0 && commonCommunities.length > 1 ? " and " : ""}
              </React.Fragment>
            ))}
            {commonCommunities?.length > 2 && (
              <span>
                {" and "}
                <span className="tooltip">
                  {`${commonCommunities?.length - 2} other ${
                    commonCommunities?.length - 2 === 1
                      ? "community"
                      : "communities"
                  }`}
                  <span className="tooltiptext">
                    {commonCommunities
                      ?.slice(2)
                      .map((c) => `${c.name}`)
                      .join(", ")}
                  </span>
                </span>
              </span>
            )}
          </p>
        )}

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
            <p>
              You are following
              <span className="font-semibold text-sky-700"> {name} </span>
              since {followingSince}
            </p>
            <button
              onClick={() => handleUnfollow(publicUserId)}
              type="button"
              className="bg-white text-red-500 border border-red-500 rounded-full py-1 px-4 text-sm font-semibold"
            >
              {unfollowLoading ? (
                <LoadingSpinner loadingText="Unfollowing..." />
              ) : (
                "Unfollow"
              )}
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
        {!isModerator && !isFollowing && (
          <button
            onClick={() => handleFollow(publicUserId)}
            type="button"
            className="bg-sky-700 text-white border border-sky-700 rounded-full py-1 px-4 text-sm font-semibold"
          >
            {followLoading ? (
              <LoadingSpinner loadingText="following..." />
            ) : (
              "Follow"
            )}
          </button>
        )}
      </div>
      {isUserFollowing && <PublicPost publicUserId={publicUserId} />}
    </div>
  );
};

export default PublicProfile;
