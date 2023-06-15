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
      <div className="main-section flex items-center justify-center h-screen">
        <CommonLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <ul className="flex">
        <li
          className={`${
            activeTab === "All posts"
              ? "border-blue-500 bg-primary rounded-md text-white"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } flex-1 cursor-pointer text-center py-2 px-1 border-b-2 font-medium`}
          onClick={() => setActiveTab("All posts")}
        >
          All post
        </li>
        <li
          className={`${
            activeTab === "You're following"
              ? "border-blue-500 bg-primary rounded-md text-white"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } flex-1 cursor-pointer text-center py-2 px-1 border-b-2 font-medium`}
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
            {postError && (
              <div className="text-red-500 bg-red-100 border border-red-500 p-3 rounded-md text-center mx-auto">
                {postError}
              </div>
            )}

            <div>{memoizedCommunityPosts}</div>
            {communityPosts.length < totalCommunityPosts && (
              <button
                className="bg-primary hover:bg-blue-700 text-sm text-white font-semibold rounded-md w-full p-2 my-3"
                onClick={handleLoadMore}
                disabled={isLoadMoreLoading}
              >
                {isLoadMoreLoading ? "Loading..." : "Load More Posts"}
              </button>
            )}
          </>
        )}
        {activeTab === "You're following" && (
          <FollowingUsersPosts communityData={communityData} />
        )}
      </div>
    </div>
  );
};

export default MainSection;
