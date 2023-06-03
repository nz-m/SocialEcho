import { useSelector, useDispatch } from "react-redux";
import { useEffect, lazy, useMemo, Suspense } from "react";
import { getPostAction, clearPostAction } from "../redux/actions/postActions";
import { useParams, useNavigate } from "react-router-dom";
import CommonLoading from "../components/loader/CommonLoading";
import FallbackLoading from "../components/loader/FallbackLoading";

const PostView = lazy(() => import("../components/post/PostView"));
const CommentSidebar = lazy(() => import("../components/post/CommentSidebar"));

const Post = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth?.userData);

  const joinedCommunities = useSelector((state) =>
    state.community?.joinedCommunities?.map(({ _id }) => _id)
  );

  useEffect(() => {
    dispatch(getPostAction(postId));

    return () => {
      dispatch(clearPostAction());
    };
  }, [dispatch, postId]);

  const post = useSelector((state) => state.posts?.post);

  const isAuthorized = useMemo(() => {
    return post && joinedCommunities?.includes(post.community._id);
  }, [post, joinedCommunities]);

  useEffect(() => {
    if (isAuthorized === false) {
      navigate("/access-denied");
    }
  }, [isAuthorized, navigate]);

  if (!post || !joinedCommunities) {
    return (
      <div className="col-span-3 flex justify-center items-center h-screen">
        <CommonLoading />
      </div>
    );
  }
  return (
    <Suspense fallback={<FallbackLoading />}>
      <PostView post={post} userData={userData} />
      <CommentSidebar comments={post.comments} />
    </Suspense>
  );
};

export default Post;
