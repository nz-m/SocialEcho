import { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAction } from "../../redux/actions/userActions";
import PostOnProfile from "../post/PostOnProfile";
import OwnProfileCard from "./OwnProfileCard";
import CommonLoading from "../loader/CommonLoading";
import OwnInfoCard from "./OwnInfoCard";
import NoPost from "../../assets/nopost.jpg";

const UserProfile = ({ userData }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const posts = user?.posts;

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      await dispatch(getUserAction(userData._id));
    };
    fetchUser().then(() => setLoading(false));
  }, [dispatch, userData._id]);

  const MemoizedPostOnProfile = memo(PostOnProfile);

  let postToShow;

  postToShow = posts?.map((post) => (
    <MemoizedPostOnProfile key={post._id} post={post} />
  ));

  return (
    <>
      {loading || !user || !posts ? (
        <div className="flex justify-center items-center h-screen">
          <CommonLoading />
        </div>
      ) : (
        <>
          <OwnProfileCard user={user} />
          <OwnInfoCard user={user} />

          <h3 className="font-semibold text-center mb-4 text-gray-700 p-3 border-b">
            Your most recent posts
          </h3>

          {postToShow?.length === 0 ? (
            <div className="text-center text-gray-700 flex justify-center items-center flex-col">
              <p className="font-semibold py-5 text-gray-500">
                You haven't posted anything yet
              </p>
              <img
                className="max-w-md rounded-full"
                src={NoPost}
                alt="no post"
              />
            </div>
          ) : (
            postToShow
          )}
        </>
      )}
    </>
  );
};

export default UserProfile;
