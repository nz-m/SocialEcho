import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFollowingUsersAction } from "../redux/actions/userActions";
import PublicProfileCard from "../components/profile/PublicProfileCard";
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
    <div className="main-section bg-white border">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <CommonLoading />
        </div>
      ) : (
        <div>
          <h2 className="font-semibold text-gray-700 mb-4 text-center border-b py-3">
            People you're following
          </h2>
          <div className="grid grid-cols-2 gap-5 items-center px-3 py-3">
            {followingUsers?.length > 0 && (
              followingUsers.map((user) => (
                <div className="grid grid-cols-2 gap-5 items-center px-3 py-3">
   <PublicProfileCard key={user._id} user={user} />
                </div>
             
              ))
            ) } 
              <div className="text-gray-500 py-5">
                <p>   You're not following anyone yet.</p>
             
              </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Following;
