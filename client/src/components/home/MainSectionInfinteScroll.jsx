import React, { useMemo, useEffect, useCallback } from "react";
import Post from "../post/Post";
import { useSelector, useDispatch } from "react-redux";
import { getPostsAction } from "../../redux/actions/postActions";

const MemoizedPost = React.memo(Post);

const MainSection = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth?.userData);
  const posts = useSelector((state) => state.posts?.posts);
  const isLoading = useSelector((state) => state.posts?.isLoading);
  const limit = 10;
  const skip = posts?.length || 0;

  useEffect(() => {
    if (userData && skip > 0) {
      dispatch(getPostsAction(userData._id, limit, skip));
    }
  }, [userData, dispatch, limit, skip]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    if (
      scrollPosition >= pageHeight &&
      !isLoading &&
      posts.length % limit === 0
    ) {
      dispatch(getPostsAction(userData._id, limit, posts.length));
    }
  }, [dispatch, isLoading, limit, posts, userData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const memoizedPosts = useMemo(() => {
    return posts.map((post) => <MemoizedPost key={post._id} post={post} />);
  }, [posts]);

  console.log(posts);
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
    </div>
  );
};

export default MainSection;
