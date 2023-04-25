import { memo, useMemo, useEffect, useState } from "react";
import { getPostsAction } from "../../redux/actions/postActions";
import { useSelector, useDispatch } from "react-redux";
import Post from "../post/Post";
import CommonLoading from "../loader/CommonLoading";

const MemoizedPost = memo(Post);

const MainSection = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(null);
  const postError = useSelector((state) => state.posts?.postError);
  const posts = useSelector((state) => state.posts?.posts);
  const totalPosts = useSelector((state) => state.posts?.totalPosts);
  const userData = useSelector((state) => state.auth?.userData);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);

  const LIMIT = 10;

  useEffect(() => {
    if (userData) {
      setIsLoading(true);
      dispatch(getPostsAction(LIMIT, 0)).finally(() => {
        setIsLoading(false);
      });
    }
  }, [userData, dispatch, LIMIT]);

  const handleLoadMore = () => {
    setIsLoadMoreLoading(true);
    dispatch(getPostsAction(LIMIT, posts.length)).finally(() => {
      setIsLoadMoreLoading(false);
    });
  };

  const memoizedPosts = useMemo(() => {
    return posts.map((post) => <MemoizedPost key={post._id} post={post} />);
  }, [posts]);
  return (
    <div className="w-6/12 px-10 py-5">
      {postError && <div className="text-red-500">{postError}</div>}

      {isLoading ? (
        <div className="flex justify-center h-screen items-center">
          <CommonLoading />
        </div>
      ) : (
        <div>{memoizedPosts}</div>
      )}

      {!isLoading && posts.length > 0 && posts.length < totalPosts && (
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLoadMore}
            disabled={isLoadMoreLoading}
          >
            {isLoadMoreLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {!isLoading && posts.length === 0 && (
        <div className="text-gray-500 text-center py-10">
          No posts to show. Join a community and post something.
        </div>
      )}
    </div>
  );
};

export default MainSection;
