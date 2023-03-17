import React, { useEffect, useMemo, useState, useCallback } from "react";
import Post from "../post/Post";
import { useSelector, useDispatch } from "react-redux";
import { getComPostsAction } from "../../redux/actions/postActions";
import PostForm from "../form/PostForm";

const MemoizedPost = React.memo(Post);

const MainSection = () => {
  const dispatch = useDispatch();
  const { communityData } = useSelector((state) => state.community);
  const { communityPosts, isLoading } = useSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 10;

  useEffect(() => {
    if (communityData && communityData._id) {
      dispatch(getComPostsAction(communityData._id, LIMIT, 0));
    }
  }, [dispatch, communityData, LIMIT]);

  const handleLoadMore = useCallback(() => {
    if (
      !isLoading &&
      communityData &&
      communityData._id &&
      communityPosts.length % LIMIT === 0
    ) {
      dispatch(
        getComPostsAction(
          communityData._id,
          LIMIT,
          communityPosts.length,
          currentPage + 1
        )
      );
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, dispatch, communityData, communityPosts, isLoading, LIMIT]);

  const memoizedCommunityPosts = useMemo(() => {
    return communityPosts.map((post) => (
      <MemoizedPost key={post._id} post={post} />
    ));
  }, [communityPosts]);

  return (
    <div className="flex-grow h-full bg-gray-100">
      {isLoading || !communityData ? (
        <div>Loading...</div>
      ) : (
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            This is {communityData?.name} community (in main section)
          </h1>
          <div className="flex flex-col mt-4">
            <div className="mb-4">
              <PostForm />
            </div>

            <div className="mt-4 flex flex-col gap-4">
              <p className="text-xl font-semibold my-5">
                Recent post from this community
              </p>

              {isLoading && <div>Loading posts...</div>}
              {!isLoading && memoizedCommunityPosts.length > 0 ? (
                <>
                  <div className="mt-4 flex flex-col gap-4">
                    {memoizedCommunityPosts}
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleLoadMore}
                    >
                      {isLoading ? "Loading..." : "Load More"}
                    </button>
                  </div>
                </>
              ) : (
                <p>No posts found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainSection;
