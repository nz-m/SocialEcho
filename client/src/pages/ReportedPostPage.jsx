import ViewReportedPost from "../components/moderator/ViewReportedPost";
import { useLocation } from "react-router-dom";
const ReportedPostPage = () => {
  const location = useLocation();
  const post = location.state.post;
  return (
    <div className="w-6/12">
      <ViewReportedPost post={post} />
    </div>
  );
};

export default ReportedPostPage;
