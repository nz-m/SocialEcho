import React, { useEffect, useState } from "react";
import Leftbar from "../components/home/LeftBar";
import Rightbar from "../components/home/RightBar";
import ProfileCard from "../components/profile/ProfileCard";
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
    <div className="flex mx-6">
      <Leftbar />

      <div className="w-6/12 h-screen bg-white border border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">People you're following</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            followingUsers?.map((user) => (
              <ProfileCard key={user._id} user={user} />
            ))
          )}
        </div>
      </div>

      <Rightbar />
    </div>
  );
};
export default Following;
