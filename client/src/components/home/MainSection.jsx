import React, { useMemo, useEffect, useCallback, useState } from "react";
import Post from "../post/Post";
import { useSelector, useDispatch } from "react-redux";
import { getPostsAction } from "../../redux/actions/postActions";

const MemoizedPost = React.memo(Post);

const MainSection = () => {
  const postError = useSelector((state) => state.posts.postError);

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const LIMIT = 10;

  const [activeTab, setActiveTab] = useState("all-posts");

  useEffect(() => {
    if (userData) {
      dispatch(getPostsAction(userData._id, LIMIT, 0)).finally(() => {
        setIsLoading(false);
      });
    }
  }, [userData, dispatch, LIMIT]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && posts.length % LIMIT === 0 && posts.length >= LIMIT) {
      setIsLoadMoreLoading(true);
      dispatch(getPostsAction(userData._id, LIMIT, posts.length)).finally(
        () => {
          setIsLoadMoreLoading(false);
        }
      );
    }
  }, [dispatch, isLoading, posts, LIMIT, userData]);

  const memoizedPosts = useMemo(() => {
    return posts.map((post) => <MemoizedPost key={post._id} post={post} />);
  }, [posts]);

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="w-6/12">
      <div className="flex justify-center items-center h-32 bg-gray-200 rounded-lg shadow-xl mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Welcome</h1>
      </div>
      <div className="flex justify-center mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === "all-posts"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabClick("all-posts")}
        >
          All Posts
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "your-following"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabClick("your-following")}
        >
          Your Following
        </button>
      </div>
      {postError && <div className="text-red-500">{postError}</div>}
      {activeTab === "all-posts" ? (
        <>
          <div>{memoizedPosts}</div>
          {isLoading && <div>Loading...</div>}
          {!isLoading &&
            posts.length >= LIMIT &&
            posts.length % LIMIT === 0 && (
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleLoadMore}
                >
                  {isLoadMoreLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          {!isLoading && posts.length === 0 && (
            <div className="text-gray-500 text-center py-10">
              No posts found.
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-500 text-center py-10">
          Your Following tab content goes here.
        </div>
      )}
    </div>
  );
};

export default MainSection;
