import React, { memo, useEffect, useMemo, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComPostsAction } from "../../redux/actions/postActions";
import PostForm from "../form/PostForm";
import Post from "../post/Post";

const MemoizedPost = memo(Post);

const MainSection = () => {
  const dispatch = useDispatch();

  const { communityData } = useSelector((state) => state.community) || {};
  const { communityPosts, isLoading } =
    useSelector((state) => state.posts) ?? {};

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All posts");
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
      communityPosts.length % LIMIT === 0 &&
      communityPosts.length >= LIMIT
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
            <ul className="flex border-b">
              <li
                className={`${
                  activeTab === "All posts"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } flex-1 cursor-pointer text-center py-4 px-1 border-b-2 font-medium`}
                onClick={() => setActiveTab("All posts")}
              >
                All posts
              </li>
              <li
                className={`${
                  activeTab === "You're following"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } flex-1 cursor-pointer text-center py-4 px-1 border-b-2 font-medium`}
                onClick={() => setActiveTab("You're following")}
              >
                You're following
              </li>
            </ul>
            <div className="mt-4 flex flex-col gap-4">
              {activeTab === "All posts" && (
                <>
                  <div className="mb-4">
                    <PostForm />
                  </div>
                  <div className="text-xl">
                    {isLoading ? "Loading..." : memoizedCommunityPosts}
                  </div>
                  {communityPosts.length > 0 && (
                    <button
                      onClick={handleLoadMore}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Load more
                    </button>
                  )}
                </>
              )}
              {activeTab === "You're following" && (
                <div>You're not following any posts yet.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainSection;
