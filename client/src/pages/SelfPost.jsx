import { useSelector, useDispatch } from "react-redux";
import { useEffect, lazy, Suspense, useMemo } from "react";
import { getSelfPostAction } from "../redux/actions/postActions";
import { useNavigate, useParams } from "react-router-dom";
import FallbackLoading from "../components/loader/FallbackLoading";
import CommonLoading from "../components/loader/CommonLoading";

const PostView = lazy(() => import("../components/post/PostView"));
const CommentSidebar = lazy(() => import("../components/post/CommentSidebar"));

const SelfPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth?.userData);

  const joinedCommunities = useSelector((state) =>
    state.community.joinedCommunities?.map(({ name }) => name)
  );

  useEffect(() => {
    dispatch(getSelfPostAction(postId));
  }, [dispatch, postId]);

  const { selfPost: post } = useSelector((state) => state.posts);

  const isAuthorized = useMemo(() => {
    return post && joinedCommunities?.includes(post.community._id);
  }, [post, joinedCommunities]);

  useEffect(() => {
    if (isAuthorized === false) {
      navigate("/access-denied");
    }
  }, [isAuthorized, navigate]);

  if (!post || !joinedCommunities) return <CommonLoading />;

  return (
    <Suspense fallback={<FallbackLoading />}>
      <PostView post={post} userData={userData} />
      <CommentSidebar comments={post.comments} />
    </Suspense>
  );
};

export default SelfPost;
