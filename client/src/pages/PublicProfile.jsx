import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import {
  getPublicUserAction,
  getPublicUsersAction,
  unfollowUserAction,
  followUserAction,
} from "../redux/actions/userActions";
import PublicPost from "../components/profile/PublicPost";
import LoadingSpinner from "../components/loader/ButtonLoadingSpinner";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FiUsers, FiUser, FiUserMinus } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi2";
import CommonLoading from "../components/loader/CommonLoading";

import Rightbar from "../components/common/Rightbar";
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
      <div className="w-6/12 flex justify-center items-center">
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

  return (
    <>
      <div className="w-6/12 px-10 py-5">
        <div className="bg-white px-6 py-6 rounded-xl shadow-2xl shadow-[#F3F8FF]">
          <div className=" flex flex-col items-center justify-center bg-white py-6">
            <div className="relative">
              <img
                className="h-20 w-20 rounded-full object-cover mr-4"
                src={avatar}
                alt="Profile"
              />
              <button
                onClick={() => handleUnfollow(publicUserId)}
                type="button"
                className="bg-white absolute right-0 bottom-0 text-red-500 border border-red-500 rounded-full py-2 px-2 text-sm font-semibold"
              >
                {unfollowLoading ? (
                  <LoadingSpinner loadingText="Unfollowing..." />
                ) : (
                  <FiUserMinus />
                )}
              </button>
            </div>

            <div className="bg-white">
              <h1 className="text-lg text-center capitalize font-bold mt-3">
                {name}
              </h1>
              <p className="text-gray-500 text-center flex justify-center items-center ga-2">
                <CiLocationOn className="text-lg" />
                {userLocation}
              </p>
              {role === "moderator" ? (
                <p className="text-sky-700 text-center text-sm font-semibold bg-sky-200 rounded-md py-1 px-2">
                  Moderator
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-1">
            <p>{bio}</p>
            <p className="flex gap-2 items-center">
              <AiOutlineFieldTime />
              Joined on {joinedOn}
            </p>

            <p className="flex items-center gap-2">
              <HiOutlineDocumentText />
              {totalPosts} posts
            </p>
            <p className="flex gap-2 items-center">
              <FiUsers />
              {totalCommunities === 0
                ? "Not a member of any communities"
                : totalCommunities === 1
                ? "1 community"
                : `${totalCommunities} communities`}
            </p>
            <p className="flex gap-2 items-center">
              <FiUser />
              {totalFollowing} following
            </p>
          </div>
          <div className="space-y-1">
            <p className="flex items-center gap-2">
              <HiOutlineDocumentText />
              {postsLast30Days} posts in last 30 days
            </p>
            {commonCommunities?.length === 0 ? (
              <p>You have no communities in common.</p>
            ) : (
              <p className="flex items-start gap-2">
                <FiUsers />
                <>
                  You both are members of{" "}
                  {commonCommunities?.slice(0, 2).map((c, index) => (
                    <Fragment key={c._id}>
                      <Link
                        className="text-sky-700 font-bold hover:underline"
                        to={`/community/${c.name}`}
                      >
                        {c.name}
                      </Link>
                      {index === 0 && commonCommunities.length > 2 ? ", " : ""}
                      {index === 0 && commonCommunities.length > 1
                        ? " and "
                        : ""}
                    </Fragment>
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
                </>
              </p>
            )}

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
                  <span className="font-semibold">
                    {totalFollowers} follower
                  </span>
                ) : (
                  <span className="font-semibold">
                    {totalFollowers} followers
                  </span>
                )}
              </p>
            )}
            {!isModerator && !isFollowing && (
              <button
                onClick={() => handleFollow(publicUserId)}
                type="button"
                className="bg-blue-500 text-white border border-blue-500 rounded-full py-1 px-4 text-sm font-semibold"
              >
                {followLoading ? (
                  <LoadingSpinner loadingText="following..." />
                ) : (
                  "Follow"
                )}
              </button>
            )}
          </div>

          <div className="flex flex-col bg-white">
            <p className="text-xl font-semibold mt-2">Interest In </p>
            {interests && (
              <ul className="flex items-center gap-3">
                {interests.split(",").map((interest, i) => (
                  <li
                    key={i}
                    className="border mt-2 border-primary px-2 py-1 text-primary rounded-full"
                  >
                    {interest.trim()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {isUserFollowing && <PublicPost publicUserId={publicUserId} />}
      </div>

      <Rightbar />
    </>
  );
};

export default PublicProfile;
