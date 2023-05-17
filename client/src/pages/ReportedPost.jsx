import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { clearPostAction, getPostAction } from "../redux/actions/postActions";
import { useSelector, useDispatch } from "react-redux";
import CommonLoading from "../components/loader/CommonLoading";
import FallbackLoading from "../components/loader/FallbackLoading";

const ViewReportedPost = lazy(() =>
  import("../components/moderator/ViewReportedPost")
);
const CommentSidebar = lazy(() => import("../components/post/CommentSidebar"));
const ReportedPost = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const postId = location.state.postId;

  useEffect(() => {
    dispatch(getPostAction(postId));
    return () => {
      dispatch(clearPostAction());
    };
  }, [dispatch, postId]);

  const post = useSelector((state) => state.posts?.post);

  if (!post) return <CommonLoading />;
  return (
    <Suspense fallback={<FallbackLoading />}>
      <div className="w-6/12">
        <ViewReportedPost post={post} />
      </div>
      <CommentSidebar comments={post.comments} />
    </Suspense>
  );
};

export default ReportedPost;
