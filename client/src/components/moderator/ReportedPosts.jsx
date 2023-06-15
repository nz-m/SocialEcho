import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReportedPostsAction } from "../../redux/actions/communityActions";
import { useParams } from "react-router-dom";
import ReportedPost from "./ReportedPost";
import CommonLoading from "../loader/CommonLoading";
const ReportedPosts = () => {
  const dispatch = useDispatch();

  const { communityName } = useParams();

  useEffect(() => {
    dispatch(getReportedPostsAction(communityName));
  }, [dispatch, communityName]);

  const reportedPosts = useSelector((state) => state.community?.reportedPosts);

  if (!reportedPosts) {
    return <CommonLoading />;
  }

  return (
    <div className="border border-slate-200 rounded mt-1">
      {reportedPosts.length === 0 ? (
        <p className="text-center">No posts to show</p>
      ) : (
        reportedPosts.map((reportedPost) => (
          <ReportedPost key={reportedPost._id} reportedPost={reportedPost} />
        ))
      )}
    </div>
  );
};

export default ReportedPosts;
