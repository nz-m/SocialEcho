import { memo, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFollowingUsersPostsAction } from "../../redux/actions/postActions";
import CommonLoading from "../loader/CommonLoading";
import Post from "../post/Post";

const MemoizedPost = memo(Post);

const FollowingUsersPosts = ({ communityData }) => {
  const dispatch = useDispatch();

  const followingUsersPosts = useSelector(
    (state) => state.posts?.followingUsersPosts
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      setIsLoading(true);
      if (communityData?._id) {
        await dispatch(getFollowingUsersPostsAction(communityData._id));
      }
      setIsLoading(false);
    };
    fetchInitialPosts();
  }, [dispatch, communityData]);

  const memoizedFollowingUsersPost = useMemo(() => {
    return followingUsersPosts.map((post) => (
      <MemoizedPost key={post._id} post={post} />
    ));
  }, [followingUsersPosts]);

  return (
    <div className="main-section">
      {isLoading || !communityData ? (
        <div className="flex items-center justify-center">
          <CommonLoading />
        </div>
      ) : (
        <>
          {followingUsersPosts.length > 0 ? (
            <div>{memoizedFollowingUsersPost}</div>
          ) : (
            <div className="text-center text-gray-700 flex justify-center items-center flex-col">
              <img src="/client/src/assets/nopost.jpg" alt="no post" />
              <p className="text-lg font-semibold py-5">
                None of your following users have posted anything yet. Check
                back later!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FollowingUsersPosts;
