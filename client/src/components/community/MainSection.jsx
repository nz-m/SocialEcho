import React, { useEffect, useMemo, useState } from "react";
import Post from "../post/Post";
import { useSelector, useDispatch } from "react-redux";
import { getComPostsAction } from "../../redux/actions/postActions";
import PostForm from "../form/PostForm";
const MemoizedPost = React.memo(Post);

const MainSection = () => {
  const dispatch = useDispatch();
  const community = useSelector((state) => state.community.communityData);
  const communityPosts = useSelector((state) => state.posts?.communityPosts);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (community) {
      setLoading(true);
      dispatch(getComPostsAction(community._id)).finally(() =>
        setLoading(false)
      );
    }
  }, [dispatch, community]);

  const memoizedCommunityPosts = useMemo(() => {
    return communityPosts.map((post) => (
      <MemoizedPost key={post._id} post={post} />
    ));
  }, [communityPosts]);

  if (!communityPosts) return null; // add loading spinner here

  return (
    <div className="flex-grow h-full bg-gray-100">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          {community &&
            `This is ${community.name ?? "a"} community (in main section)`}
        </h1>

        <div className="flex flex-col mt-4">
          <div className="mb-4">
            <PostForm />
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <p className="text-xl font-semibold my-5">
              {" "}
              Recent post from this community
            </p>

            {loading ? (
              <p>Loading posts...</p>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {memoizedCommunityPosts}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
