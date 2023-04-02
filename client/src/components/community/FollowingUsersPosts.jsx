import React, { memo, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFollowingUsersPostsAction } from "../../redux/actions/postActions";
import Post from "../post/Post";

const MemoizedPost = memo(Post);

const FollowingUsersPosts = ({ communityData }) => {
  const dispatch = useDispatch();

  const followingUsersPosts = useSelector(
    (state) => state.posts?.followingUsersPosts
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      setIsLoading(true);
      if (communityData?._id) {
        await dispatch(getFollowingUsersPostsAction(communityData._id));
      }
      setIsLoading(false);
    };
    fetchInitialPosts();
  }, [dispatch, communityData]);

  const memoizedFollowingUsersPost = useMemo(() => {
    return followingUsersPosts.map((post) => (
      <MemoizedPost key={post._id} post={post} />
    ));
  }, [followingUsersPosts]);

  return (
    <div className="flex-grow h-full bg-gray-100">
      {isLoading || !communityData ? (
        <div>Loading...</div>
      ) : (
        <>
          {followingUsersPosts.length > 0 ? (
            <div className="text-xl">{memoizedFollowingUsersPost}</div>
          ) : (
            <div>
              None of your following users have posted anything yet. Check back
              later!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FollowingUsersPosts;
