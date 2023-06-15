import { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotJoinedCommunitiesAction } from "../../redux/actions/communityActions";
import {
  getPublicUsersAction,
  followUserAndFetchData,
} from "../../redux/actions/userActions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import JoinModal from "../modals/JoinModal";
import { BsPersonPlusFill } from "react-icons/bs";
import { IoIosPeople, IoMdPeople } from "react-icons/io";
import placeholder from "../../assets/placeholder.png";

const Rightbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [joinModalVisibility, setJoinModalVisibility] = useState({});
  const [notJoinedCommunitiesFetched, setNotJoinedCommunitiesFetched] =
    useState(false);
  const [publicUsersFetched, setPublicUsersFetched] = useState(false);

  const currentUser = useSelector((state) => state.auth?.userData);

  const recommendedUsers = useSelector((state) => state.user?.publicUsers);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getNotJoinedCommunitiesAction());
      setNotJoinedCommunitiesFetched(true);
      await dispatch(getPublicUsersAction());
    };

    fetchData().then(() => {
      setPublicUsersFetched(true);
    });
  }, [dispatch]);

  const notJoinedCommunities = useSelector(
    (state) => state.community?.notJoinedCommunities
  );

  const [visibleCommunities, remainingCount] = useMemo(() => {
    const visibleCommunities = notJoinedCommunities?.slice(0, 4) || [];
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

  const toggleJoinModal = useCallback((communityId, visible) => {
    setJoinModalVisibility((prev) => ({
      ...prev,
      [communityId]: visible,
    }));
  }, []);

  const currentLocation = useLocation().pathname;

  return (
    <div className="hidden rightbar overflow-auto">
      {currentLocation !== "/communities" && (
        <div>
          <div className="flex items-end justify-between mb-4">
            <h5 className="font-semibold text-sm">Suggested Communities</h5>
            {remainingCount > 0 && (
              <Link
                className="flex relative items-center text-sm font-medium text-primary mr-4"
                to="/communities"
              >
                See all
                <p className="absolute -top-2 -right-4 text-white text-xs bg-primary w-4 h-4 rounded-full flex justify-center items-center">
                  {" "}
                  {remainingCount}
                </p>
              </Link>
            )}
          </div>

          {notJoinedCommunitiesFetched && visibleCommunities.length === 0 && (
            <div className="text-center italic text-gray-400">
              No communities to join. Check back later
            </div>
          )}
          <ul className="flex flex-col gap-3 ">
            {visibleCommunities?.map((community) => (
              <li
                key={community._id}
                className="flex items-center justify-between bg-white px-2 py-1 rounded-md"
              >
                <div className="flex items-center">
                  <img
                    src={community.banner || placeholder}
                    className="h-8 w-8 rounded-full mr-4 object-cover"
                    alt="community"
                  />
                  <div className="text-base font-medium flex flex-col">
                    <p className="line-clamp-1"> {community.name}</p>

                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <IoMdPeople />
                      {community.members.length}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleJoinModal(community._id, true)}
                  className="text-primary border border-dashed border-blue-500
                        hover:bg-primary 
                         rounded-md py-1 px-2 text-sm font-semibold group transition duration-300"
                >
                  <p className="group-hover:text-white flex items-center gap-2">
                    <IoIosPeople className="inline-block text-lg" />
                    Join
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

      <hr className="my-3" />
      <h5 className="mb-4 text-sm font-semibold">Popular Users to Follow</h5>

      {publicUsersFetched && recommendedUsers?.length === 0 && (
        <div className="text-center italic text-gray-400">
          No users to follow. Check back later
        </div>
      )}
      <ul className="flex flex-col gap-3">
        {recommendedUsers?.length > 0 &&
          recommendedUsers.map((user) => (
            <li
              key={user._id}
              className="flex justify-between items-center gap-5 bg-white shadow-2xl shadow-[#f2f5fc]  border border-slate-100 px-2 py-1 rounded-lg"
            >
              <div className="flex justify-content-between items-center gap-1">
                <img
                  className="h-7 w-7 rounded-full flex-shrink-0 object-cover"
                  src={user.avatar}
                  alt={user.name}
                />
                <div>
                  <Link
                    to={`/user/${user._id}`}
                    className="font-medium text-base line-clamp-1"
                  >
                    {user.name}
                  </Link>
                  <div className="text-xs text-slate-400">
                    Followers: {user.followerCount}
                  </div>
                </div>
              </div>
              <button
                disabled={followLoading[user._id]}
                onClick={() => followUserHandler(user._id)}
                className="text-primary border border-dashed border-blue-500 hover:bg-primary rounded-md py-1 px-2 text-sm font-semibold group transition duration-300"
              >
                {followLoading[user._id] ? (
                  <div className="group-hover:text-white flex items-center gap-2 justify-center">
                    <span className="loader"></span>
                  </div>
                ) : (
                  <p className="group-hover:text-white flex items-center gap-2">
                    <BsPersonPlusFill className="inline-block" />
                    Follow
                  </p>
                )}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Rightbar;
