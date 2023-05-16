import { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAction } from "../../redux/actions/userActions";
import PostOnProfile from "../post/PostOnProfile";
import SelfProfileCard from "./SelfProfileCard";
import SelfInfoCard from "./SelfInfoCard";
import CommonLoading from "../loader/CommonLoading";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth?.userData);
  const user = useSelector((state) => state.user?.user);
  const posts = user?.posts;

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      await dispatch(getUserAction(userData._id));
      setLoading(false);
    };
    fetchUser();
  }, [dispatch, userData._id]);

  const MemoizedPostOnProfile = memo(PostOnProfile);

  let postToShow = null;

  postToShow = posts?.map((post) => (
    <MemoizedPostOnProfile key={post._id} post={post} />
  ));

  return (
    <>
      {loading ? (
        <div className="w-6/12 flex items-center justify-center h-screen">
          <CommonLoading />
        </div>
      ) : (
        <div className="w-6/12 px-10 py-6">
          <SelfProfileCard user={user} />
          <SelfInfoCard user={user} />

          <h3 className="text-lg font-bold mb-4">Your most recent posts</h3>

          {postToShow?.length === 0 ? (
            <p className="text-gray-600">No posts available.</p>
          ) : (
            postToShow
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
