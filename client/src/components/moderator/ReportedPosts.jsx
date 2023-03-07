import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReportedPostsAction } from "../../redux/actions/communityActions";
import { useParams } from "react-router-dom";
import ReportedPost from "./ReportedPost";

const ReportedPosts = () => {
  const dispatch = useDispatch();
  const { communityName } = useParams();

  useEffect(() => {
    dispatch(getReportedPostsAction(communityName));
  }, [dispatch, communityName]);

  const reportedPosts = useSelector((state) => state.community?.reportedPosts);

  if (!reportedPosts) return null; // add loading spinner here

  return (
    <div className="shadow-md">
      {reportedPosts.map((reportedPost) => (
        <ReportedPost key={reportedPost._id} reportedPost={reportedPost} />
      ))}
    </div>
  );
};

export default ReportedPosts;
