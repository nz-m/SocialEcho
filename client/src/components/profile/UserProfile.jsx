import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAction } from "../../redux/actions/userActions";
import PostOnProfile from "../post/PostOnProfile";
import SelfProfileCard from "./SelfProfileCard";
import SelfInfoCard from "./SelfInfoCard";

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

  const MemoizedPostOnProfile = React.memo(PostOnProfile);

  let postToShow = null;

  if (posts) {
    const postsWithUser = posts.map((post) => ({
      ...post,
      createdAt: new Date(post.createdAt).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    }));

    postToShow = postsWithUser
      .reverse()
      .map((post) => <MemoizedPostOnProfile key={post._id} post={post} />);
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="border-2">
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
