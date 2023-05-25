import { memo, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getComPostsAction,
  clearCommunityPostsAction,
} from "../../redux/actions/postActions";
import PostForm from "../form/PostForm";
import Post from "../post/Post";
import FollowingUsersPosts from "./FollowingUsersPosts";
import CommonLoading from "../loader/CommonLoading";

const MemoizedPost = memo(Post);

const MainSection = () => {
  const dispatch = useDispatch();

  const communityData = useSelector((state) => state.community?.communityData);
  const communityPosts = useSelector((state) => state.posts?.communityPosts);

  const totalCommunityPosts = useSelector(
    (state) => state.posts?.totalCommunityPosts
  );

  const [activeTab, setActiveTab] = useState("All posts");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const LIMIT = 10;

  const postError = useSelector((state) => state.posts?.postError);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      if (communityData?._id) {
        dispatch(getComPostsAction(communityData._id, LIMIT, 0)).finally(() => {
          setIsLoading(false);
        });
      }
    };

    fetchInitialPosts();

    return () => {
      dispatch(clearCommunityPostsAction());
    };
  }, [dispatch, communityData]);

  const handleLoadMore = () => {
    if (
      !isLoadMoreLoading &&
      communityPosts.length > 0 &&
      communityPosts.length < totalCommunityPosts
    ) {
      setIsLoadMoreLoading(true);
      dispatch(
        getComPostsAction(communityData._id, LIMIT, communityPosts.length)
      ).finally(() => {
        setIsLoadMoreLoading(false);
      });
    }
  };

  const memoizedCommunityPosts = useMemo(() => {
    return communityPosts?.map((post) => (
      <MemoizedPost key={post._id} post={post} />
    ));
  }, [communityPosts]);

  if (isLoading || !communityData || !communityPosts) {
    return (
      <div className="w-6/12 flex items-center justify-center">
        <CommonLoading />
      </div>
    );
  }
  return (
    <div className="w-6/12 px-10 py-5">
      <div className="flex flex-col mt-4">
        <ul className="flex border-b">
          <li
            className={`${
              activeTab === "All posts"
                ? "border-blue-500  text-blue-600"
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
                <PostForm
                  communityId={communityData._id}
                  communityName={communityData.name}
                />
              </div>
              {postError && <div className="text-red-500">{postError}</div>}

              <div>{memoizedCommunityPosts}</div>
              {communityPosts.length < totalCommunityPosts && (
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
            </>
          )}
          {activeTab === "You're following" && (
            <FollowingUsersPosts communityData={communityData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSection;
