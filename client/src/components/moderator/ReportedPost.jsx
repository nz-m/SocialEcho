import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {IoTimerOutline} from "react-icons/io5";
const ReportedPost = ({ reportedPost }) => {
  const navigate = useNavigate();
  const { post, reportedBy, reportReason, reportDate } = reportedPost;
  const { communityName } = useParams();

  const handleNavigateToPost = () => {
    navigate(`/community/${communityName}/reported-post`, { state: { post } });
  };

  return (
    <div
      className=" p-4"
      onClick={handleNavigateToPost}
      style={{ cursor: "pointer" }}
    >
      <div className="flex items-center gap-2">
        <img
          className="w-16 h-16 rounded-full"
          src={reportedBy.avatar}
          alt="user avatar"
        />
        <div className="flex flex-col">
          <span className="font-bold"> {reportedBy.name}</span>
          <span className="text-xs flex items-center gap-1">
            <IoTimerOutline/>
            {reportDate}</span>

          <div className="flex items-center gap-2">
            <p className="text-sm text-red-700 font-semibold">Reason:</p>
            <p className="text-sm text-red-700 font-semibold">
              {reportReason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportedPost;
