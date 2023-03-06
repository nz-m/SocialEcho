import React from "react";
import Leftbar from "../components/home/LeftBar";
import RightBar from "../components/community/RightBar";
import ViewReportedPost from "../components/moderator/ViewReportedPost";
import { useLocation } from "react-router-dom";
const ReportedPostPage = () => {
  const location = useLocation();
  const post = location.state.post;
  return (
    <div className="flex mx-6">
      <Leftbar />
      <div className="w-6/12">
        <ViewReportedPost post={post} />
      </div>
      <RightBar />
    </div>
  );
};

export default ReportedPostPage;
