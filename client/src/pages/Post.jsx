import { useSelector, useDispatch } from "react-redux";
import { useEffect, lazy, Suspense } from "react";
import { getPostAction, clearPostAction } from "../redux/actions/postActions";
import { useParams } from "react-router-dom";
import CommonLoading from "../components/loader/CommonLoading";
import FallbackLoading from "../components/loader/FallbackLoading";

const PostView = lazy(() => import("../components/post/PostView"));
const CommentSidebar = lazy(() => import("../components/post/CommentSidebar"));

const Post = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth?.userData);
  const post = useSelector((state) => state.posts?.post);

  useEffect(() => {
    if (userData?._id) {
      dispatch(getPostAction(postId));
    }

    return () => {
      dispatch(clearPostAction());
    };
  }, [dispatch, userData, postId]);

  if (!post) return <CommonLoading />;

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

export default Post;
