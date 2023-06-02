import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModProfileAction } from "../../redux/actions/authActions";
import CommonLoading from "../loader/CommonLoading";

const ModeratorProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getModProfileAction());
  }, [dispatch]);

  const moderator = useSelector((state) => state.moderation?.modProfile);
  if (!moderator)
    return (
      <div className="flex justify-center items-center">
        <CommonLoading />
      </div>
    );

  return (
    <div className="flex flex-col gap-2 items-center ">
      <img
        src={moderator.avatar}
        alt="user"
        className="w-20 h-20 rounded-full object-cover"
      />
      <p>
        <span className="font-bold">{moderator.name}</span>
      </p>

      <p>{moderator.email}</p>
      <p>Joined: {moderator.createdAt}</p>
    </div>
  );
};

export default ModeratorProfile;
