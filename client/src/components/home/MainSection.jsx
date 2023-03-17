import React, { useMemo, useEffect, useCallback, useState } from "react";
import Post from "../post/Post";
import { useSelector, useDispatch } from "react-redux";
import { getPostsAction } from "../../redux/actions/postActions";

const MemoizedPost = React.memo(Post);

const MainSection = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);

  const LIMIT = 10;

  useEffect(() => {
    if (userData && posts.length < LIMIT) {
      dispatch(getPostsAction(userData._id, LIMIT, 0));
    }
  }, [userData, dispatch, posts, LIMIT]);

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

  if (!posts || isLoading) {
    return (
      <div className="w-6/12">
        <div className="flex justify-center items-center h-32 bg-gray-200 rounded-lg shadow-xl mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Welcome</h1>
        </div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-6/12">
      <div className="flex justify-center items-center h-32 bg-gray-200 rounded-lg shadow-xl mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Welcome</h1>
      </div>
      <div>{memoizedPosts}</div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (posts.length < LIMIT || posts.length % LIMIT !== 0) && (
        <div>No more posts</div>
      )}
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
    </div>
  );
};

export default MainSection;
