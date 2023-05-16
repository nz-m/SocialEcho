import { useSelector, useDispatch } from "react-redux";
import { useEffect, lazy, Suspense } from "react";
import { getSelfPostAction } from "../redux/actions/postActions";
import { useParams } from "react-router-dom";
import FallbackLoading from "../components/loader/FallbackLoading";

const PostView = lazy(() => import("../components/post/PostView"));
const CommentSidebar = lazy(() => import("../components/post/CommentSidebar"));

const SelfPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth?.userData);
  const post = useSelector((state) => state.posts?.selfPost);

  useEffect(() => {
    if (userData) {
      dispatch(getSelfPostAction(postId));
    }
  }, [userData, dispatch, postId]);

  if (!post) return null; // add loading spinner here

  return (
    <>
      <Suspense fallback={<FallbackLoading />}>
        <PostView post={post} userData={userData} />
      </Suspense>
      <Suspense fallback={<FallbackLoading />}>
        <CommentSidebar comments={post.comments} />
      </Suspense>
    </>
  );
};

export default SelfPost;
