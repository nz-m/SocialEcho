import React, { memo, useMemo, useEffect, useCallback, useState } from "react";
import { getPostsAction } from "../../redux/actions/postActions";
import { useSelector, useDispatch } from "react-redux";
import Post from "../post/Post";

const MemoizedPost = memo(Post);

const MainSection = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const postError = useSelector((state) => state.posts?.postError);
  const posts = useSelector((state) => state.posts?.posts);
  const userData = useSelector((state) => state.auth?.userData);

  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const LIMIT = 10;

  useEffect(() => {
    if (userData) {
      dispatch(getPostsAction(LIMIT, 0)).finally(() => {
        setIsLoading(false);
      });
    }
  }, [userData, dispatch, LIMIT]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && posts.length % LIMIT === 0 && posts.length >= LIMIT) {
      setIsLoadMoreLoading(true);
      dispatch(getPostsAction(LIMIT, posts.length)).finally(() => {
        setIsLoadMoreLoading(false);
      });
    }
  }, [dispatch, isLoading, posts, LIMIT]);

  const memoizedPosts = useMemo(() => {
    return posts.map((post) => <MemoizedPost key={post._id} post={post} />);
  }, [posts]);

  return (
    <div className="w-6/12">
      <div className="flex justify-center items-center h-32 bg-gray-200 rounded-lg shadow-xl mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Welcome</h1>
      </div>
      {postError && <div className="text-red-500">{postError}</div>}
      <div>{memoizedPosts}</div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && posts.length >= LIMIT && posts.length % LIMIT === 0 && (
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
          No posts to show. Join a communtiy and post something.
        </div>
      )}
    </div>
  );
};

export default MainSection;
