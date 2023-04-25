import { useEffect, useState } from "react";
import PublicProfileCard from "../components/profile/PublicProfileCard";
import { useSelector, useDispatch } from "react-redux";
import { getFollowingUsersAction } from "../redux/actions/userActions";
import CommonLoading from "../components/loader/CommonLoading";

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
    {loading ? (
      <div className="flex items-center justify-center h-screen">
        <CommonLoading />
      </div>
    ) : (
      <>
        <h2 className="text-xl font-bold mb-4 text-center">
          People you're following
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {followingUsers?.length > 0 ? (
            followingUsers.map((user) => (
              <PublicProfileCard key={user._id} user={user} />
            ))
          ) : (
            <div className="text-gray-500 text-center py-10">
              You're not following anyone yet.
            </div>
          )}
        </div>
      </>
    )}
  </div>
);

};
export default Following;
