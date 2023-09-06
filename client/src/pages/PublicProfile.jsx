import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  getPublicUserAction,
  getPublicUsersAction,
  unfollowUserAction,
  followUserAction,
} from "../redux/actions/userActions";
import PublicPost from "../components/profile/PublicPost";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FiUsers, FiUser, FiUserMinus, FiUserPlus } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi2";
import CommonLoading from "../components/loader/CommonLoading";
import Tooltip from "../components/shared/Tooltip";

const PublicProfile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [followLoading, setFollowLoading] = useState(false);
  const [unfollowLoading, setUnfollowLoading] = useState(false);

  const userData = useSelector((state) => state.auth?.userData);
  const userProfile = useSelector((state) => state.user?.publicUserProfile);
  const isUserFollowing = useSelector((state) => state.user?.isFollowing);
  const isModerator = useSelector(
    (state) => state.auth?.userData?.role === "moderator"
  );

  const publicUserId = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(getPublicUserAction(publicUserId));
  }, [dispatch, isUserFollowing, publicUserId]);

  useEffect(() => {
    if (publicUserId === userData?._id) {
      navigate("/profile", { replace: true });
    }
  }, [publicUserId, userData, navigate]);

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
    return (
      <div className="col-span-2 flex items-center justify-center">
        <CommonLoading />
      </div>
    );
  }

  const {
    name,
    avatar,
    location: userLocation,
    bio,
    role,
    interests,
    totalPosts,
    totalCommunities,
    joinedOn,
    totalFollowers,
    totalFollowing,
    isFollowing,
    followingSince,
    postsLast30Days,
    commonCommunities,
  } = userProfile;

  const Button = ({ loading, onClick, tooltipText, icon, color }) => (
    <button
      onClick={onClick}
      type="button"
      className={`absolute bottom-0 right-0 h-9 w-9 rounded-full border px-2 py-2 text-sm font-semibold ${color} bg-white`}
      disabled={loading}
    >
      {loading ? (
        <span className="text-xs">Wait</span>
      ) : (
        <Tooltip text={tooltipText}>{icon}</Tooltip>
      )}
    </button>
  );

  const FollowButton = ({ loading, onClick, name }) => (
    <Button
      loading={loading}
      onClick={onClick}
      tooltipText={`Follow ${name}`}
      icon={<FiUserPlus />}
      color="text-primary border-primary"
    />
  );

  const UnfollowButton = ({ loading, onClick, name }) => (
    <Button
      loading={loading}
      onClick={onClick}
      tooltipText={`Unfollow ${name}`}
      icon={<FiUserMinus />}
      color="text-red-500 border-red-500"
    />
  );

  return (
    <div className="main-section">
      <div className="rounded border bg-white px-6 py-6">
        <div className="flex flex-col items-center justify-center bg-white py-6">
          <div className="relative">
            <img
              className="mr-4 h-20 w-20 rounded-full object-cover"
              src={avatar}
              alt="Profile"
              loading="lazy"
            />
            <UnfollowButton
              loading={unfollowLoading}
              onClick={() => handleUnfollow(publicUserId)}
              name={name}
            />
            {!isModerator && !isFollowing && (
              <FollowButton
                loading={followLoading}
                onClick={() => handleFollow(publicUserId)}
                name={name}
              />
            )}
          </div>
        </div>

        <div>
          <h1 className="mt-3 text-center text-lg font-bold capitalize">
            {name}
          </h1>
          <p className="ga-2 flex items-center justify-center text-center text-gray-500">
            <CiLocationOn className="text-lg" />
            {userLocation === "" ? "N/A" : userLocation}
          </p>
          {role === "moderator" ? (
            <p className="rounded-md bg-sky-200 px-2 py-1 text-center text-sm font-semibold text-sky-700">
              Moderator
            </p>
          ) : null}
        </div>
        <div>
          <p>{bio}</p>
          <p className="flex items-center gap-2">
            <AiOutlineFieldTime />
            Joined on {joinedOn}
          </p>
          <p className="flex items-center gap-2">
            <HiOutlineDocumentText />
            {totalPosts} posts
          </p>
          <p className="flex items-center gap-2">
            <FiUsers />
            {totalCommunities === 0
              ? "Not a member of any communities"
              : totalCommunities === 1
              ? "1 community"
              : `${totalCommunities} communities`}
          </p>
          <p className="flex items-center gap-2">
            <FiUser />
            {totalFollowing} following
          </p>
        </div>

        <p className="flex items-center gap-2">
          <HiOutlineDocumentText />
          {postsLast30Days} {postsLast30Days === 1 ? "post" : "posts"} in last
          30 days
        </p>

        {isFollowing && role !== "moderator" ? (
          <>
            {totalFollowers === 1 ? (
              <p className="flex items-center gap-2">
                <FiUser />
                Followed by you
              </p>
            ) : (
              <p className="flex items-center gap-2">
                <FiUser />
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

        {commonCommunities?.length === 0 ? (
          <p>You have no communities in common.</p>
        ) : (
          <p>
            You both are members of{" "}
            {commonCommunities?.slice(0, 1).map((c) => (
              <Fragment key={c._id}>
                <Link
                  className="font-bold text-sky-700 hover:underline"
                  to={`/community/${c.name}`}
                >
                  {c.name}
                </Link>
              </Fragment>
            ))}
            {commonCommunities?.length > 1 && (
              <span>
                {" and "}
                <span className="tooltip">
                  {`${commonCommunities?.length - 1} other ${
                    commonCommunities?.length - 1 === 1
                      ? "community"
                      : "communities"
                  }`}
                  <span className="tooltiptext">
                    {commonCommunities
                      ?.slice(1)
                      .map((c) => `${c.name}`)
                      .join(", ")}
                  </span>
                </span>
              </span>
            )}
          </p>
        )}
        <div className="flex flex-col">
          <p className="mt-2 font-semibold">Interests </p>
          {interests ? (
            <div className="flex flex-wrap gap-2">
              {interests.split(",").map((interest, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {interest.trim()}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">{name} has not added any interests.</p>
          )}
        </div>
      </div>
      {isUserFollowing && <PublicPost publicUserId={publicUserId} />}
    </div>
  );
};

export default PublicProfile;
