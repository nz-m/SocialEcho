import React, { memo, useEffect, useMemo, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFollowingUsersPostsAction } from "../../redux/actions/postActions";
import Post from "../post/Post";

const MemoizedPost = memo(Post);

const FollowingUsersPosts = ({ communityData }) => {
  const dispatch = useDispatch();

  const followingUsersPosts = useSelector(
    (state) => state.posts?.followingUsersPosts
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const LIMIT = 10;

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

  const handleLoadMore = useCallback(() => {
    if (
      !isLoadMoreLoading &&
      communityData?._id &&
      followingUsersPosts.length % LIMIT === 0 &&
      followingUsersPosts.length >= currentPage * LIMIT
    ) {
      setIsLoadMoreLoading(true);
      dispatch(
        getFollowingUsersPostsAction(
          communityData._id,
          LIMIT,
          followingUsersPosts.length,
          (page) => page + 1
        )
      ).then(() => {
        setIsLoadMoreLoading(false);
        setCurrentPage((page) => page + 1);
      });
    }
  }, [
    dispatch,
    communityData,
    followingUsersPosts,
    isLoadMoreLoading,
    LIMIT,
    currentPage,
  ]);

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
          <div className="text-xl">
            {isLoading ? "Loading..." : memoizedFollowingUsersPost}
          </div>
          {followingUsersPosts.length > 0 &&
            followingUsersPosts.length % LIMIT === 0 && (
              <button
                onClick={handleLoadMore}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isLoadMoreLoading ? "Loading..." : "Load more"}
              </button>
            )}
        </>
      )}
    </div>
  );
};

export default FollowingUsersPosts;
