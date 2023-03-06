import React from "react";
import { useNavigate, useParams } from "react-router-dom";
const ReportedPost = ({ reportedPost }) => {
  const navigate = useNavigate();
  const { post, reportedBy, reportReason, reportDate } = reportedPost;
  const { communityName } = useParams();

  const handleNavigateToPost = () => {
    navigate(`/community/${communityName}/reported-post`, { state: { post } });
  };

  return (
    <div
      className="shadow-sm p-4"
      onClick={handleNavigateToPost}
      style={{ cursor: "pointer" }}
    >
      <div className="flex items-center gap-2">
        <img
          className="w-10 h-10 rounded-full"
          src={reportedBy.avatar}
          alt="user avatar"
        />
        <div className="flex flex-col">
          <span className="font-bold"> Reported By: {reportedBy.name}</span>
          <span className="text-xs font-semibold">When : {reportDate}</span>

          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-500 font-semibold">Reason:</p>
            <p className="text-xs text-gray-500 font-semibold">
              {reportReason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportedPost;
