import React, { useState } from "react";
import { reportPostAction } from "../../redux/actions/communityActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ReportPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const post = location.state.post;
  const communityName = location.state.communityName;
  const userData = useSelector((state) => state.auth?.userData);

  if (!userData) {
    navigate("/login");
  }

  const reportHandler = () => {
    setIsLoading(true);
    const userId = userData._id;
    dispatch(
      reportPostAction(communityName, {
        postId: post._id,
        reportReason: reason,
        reportedBy: userId,
      })
    ).then(() => {
      setIsLoading(false);
      navigate(-1);
    });
  };

  const handleReasonChange = (e) => {
    const value = e.target.value;
    setReason(value);
    setIsDisabled(value.length === 0);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Report Post</h1>
        <p className="text-gray-500">
          Please provide a reason for reporting this post.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="reason">Reason</label>
        <textarea
          id="reason"
          name="reason"
          rows="5"
          className="border border-gray-300 rounded-md p-2"
          value={reason}
          onChange={handleReasonChange}
          required={true}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={reportHandler}
          disabled={isDisabled}
          style={{ display: isDisabled ? "none" : "block" }}
        >
          {isLoading ? "Loading..." : "Report"}
        </button>
      </div>
    </>
  );
};

export default ReportPost;
