import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getComMembersAction } from "../../redux/actions/communityActions";
import UnbanUserModal from "../modals/UnbanUserModal";

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
      <h3 className="text-2xl font-bold">Banned Users</h3>
      <div className="flex flex-col">
        {bannedUsers &&
          bannedUsers.map((bannedMember) => (
            <div
              key={bannedMember._id}
              className="flex flex-row  items-center border border-black rounded-md my-2"
            >
              <img
                src={bannedMember.avatar}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <Link to={`/user/${bannedMember._id}`} className="ml-2 font-bold">
                {bannedMember.name}
              </Link>
              <div className="flex flex-col">
                <p className="ml-2">{bannedMember.location}</p>
                <p className="ml-2">
                  Joined: {new Date(bannedMember.createdAt).toDateString()}
                </p>
              </div>
              <button
                onClick={() => {
                  toggleUnbanUserModal(bannedMember._id, true);
                }}
                className="ml-2 bg-sky-500 hover:bg-sky-700 text-white font-bold rounded px-2 py-1 text-sm"
              >
                Unban user
              </button>
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
