import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getComMembersAction } from "../../redux/actions/communityActions";
import UnbanUserModal from "../modals/UnbanUserModal";
import { IoTimerOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

const BannerMembersList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const communityName = location.pathname.split("/")[2] || "";

  const [unbanUserModalVisibility, setBanUserModalVisibility] = useState({});
  const toggleUnbanUserModal = (userId, visible) => {
    setBanUserModalVisibility((prevVisibility) => ({
      ...prevVisibility,
      [userId]: visible,
    }));
  };

  useEffect(() => {
    dispatch(getComMembersAction(communityName));
  }, [dispatch, communityName]);

  const bannedUsers =
    useSelector((state) => state.moderation.bannedUsers) || [];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {bannedUsers && bannedUsers.length === 0 && (
          <p className="text-center text-gray-500 font-semibold">
            No banned users to show
          </p>
        )}
        {bannedUsers &&
          bannedUsers.map((bannedMember) => (
            <div
              key={bannedMember._id}
              className="flex flex-col border border-gray-200  px-6 py-3 my-3 rounded-lg "
            >
              <div className="flex justify-between items-center">
                <div className="flex">
                  <img
                    src={bannedMember.avatar}
                    alt="profile"
                    className="w-16 h-16 rounded-full"
                  />

                  <div className="flex flex-col">
                    <Link
                      to={`/user/${bannedMember._id}`}
                      className="ml-2 font-bold"
                    >
                      {bannedMember.name}
                    </Link>
                    <p className="ml-2 text-xs flex gap-1 items-center">
                      <CiLocationOn />
                      {bannedMember.location}
                    </p>
                    <p className="ml-2 text-xs flex gap-1 items-center">
                      <IoTimerOutline />
                      {new Date(bannedMember.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    toggleUnbanUserModal(bannedMember._id, true);
                  }}
                  className="ml-2 bg-primary hover:bg-sky-700 text-white font-bold rounded-lg px-4 py-2 h-9 flex justify-center items-center text-sm"
                >
                  Unban user
                </button>
              </div>

              <UnbanUserModal
                key={bannedMember._id}
                show={unbanUserModalVisibility[bannedMember._id] || false}
                onClose={() => {
                  toggleUnbanUserModal(bannedMember._id, false);
                }}
                userId={bannedMember._id}
                communityName={communityName}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(BannerMembersList);
