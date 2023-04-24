import { useEffect, useState } from "react";
import PublicProfileCard from "../components/profile/PublicProfileCard";
import { useSelector, useDispatch } from "react-redux";
import { getFollowingUsersAction } from "../redux/actions/userActions";

const Following = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const followingUsers = useSelector((state) => state.user?.followingUsers);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      setLoading(true);
      await dispatch(getFollowingUsersAction());
      setLoading(false);
    };

    fetchFollowingUsers();
  }, [dispatch]);
  return (
    <div className="w-6/12 px-10 py-6">
      <h2 className="text-xl font-bold mb-4">People you're following</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : followingUsers?.length > 0 ? (
          followingUsers.map((user) => (
            <PublicProfileCard key={user._id} user={user} />
          ))
        ) : (
          <div className="text-gray-500 text-center py-10">
            You're not following anyone yet.
          </div>
        )}
      </div>
    </div>
  );
};
export default Following;
