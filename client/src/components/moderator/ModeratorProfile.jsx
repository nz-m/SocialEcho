import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModProfileAction } from "../../redux/actions/authActions";

const ModeratorProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getModProfileAction());
  }, [dispatch]);

  const moderator = useSelector((state) => state.moderation.modProfile);
  if (!moderator) return null; // later add a loading spinner

  return (
    <div className="flex flex-col items-center justify-center rounded-lg shadow-md p-4">
      <img
        src={moderator.avatar}
        alt="user"
        className="w-20 h-20 rounded-full object-cover"
      />
      <p>
        <span className="font-bold">Moderator Profile</span>
      </p>
      <p>
        <span className="font-bold">Name:</span> {moderator.name}
      </p>
      <p>
        <span className="font-bold">Email:</span> {moderator.email}
      </p>
      <p>
        <span className="font-bold">Joined:</span> {moderator.createdAt}
      </p>
      <p>Other infos here, will be added later</p>
    </div>
  );
};

export default ModeratorProfile;
