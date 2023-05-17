import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModProfileAction } from "../../redux/actions/authActions";
import { MdOutlineMail, MdJoinInner } from "react-icons/md";

const ModeratorProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getModProfileAction());
  }, [dispatch]);

  const moderator = useSelector((state) => state.moderation?.modProfile);
  if (!moderator) return null; // later add a loading spinner

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

      <p className="flex items-center gap-2">
        <span className="font-bold">
          <MdOutlineMail />
        </span>{" "}
        {moderator.email}
      </p>
      <p className="flex items-center gap-2">
        <span className="font-bold">
          <MdJoinInner />
        </span>{" "}
        {moderator.createdAt}
      </p>
      <p>Other infos here, will be added later</p>
    </div>
  );
};

export default ModeratorProfile;
