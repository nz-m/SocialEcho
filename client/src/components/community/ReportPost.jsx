import React, { useState } from "react";
import { reportPostAction } from "../../redux/actions/communityActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {IoArrowBackCircleOutline} from "react-icons/io5";

const ReportPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const post = location.state?.post;
  const communityName = location.state?.communityName;
  const userData = useSelector((state) => state.auth?.userData);

  if (!userData) {
    navigate("/login");
  }

  const reportHandler = async () => {
    setIsLoading(true);
    const userId = userData._id;
    try {
      await dispatch(
        reportPostAction(communityName, {
          postId: post._id,
          reportReason: reason,
          reportedBy: userId,
        })
      );
      setIsLoading(false);
      navigate(-1);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      // handle error
    }
  };

  const handleReasonChange = (e) => {
    const value = e.target.value;
    setReason(value);
    setIsDisabled(value.length === 0);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="px-40 py-20 mx-auto  flex flex-col justify-center md:h-screen items-center bg-slate-50 ">
        <div className="flex flex-col w-full bg-white px-10 rounded-2xl shadow-2xl shadow-[#F3F8FF] py-10">
 <span className="text-blue-500 text-4xl ">
          <button onClick={handleBack}><IoArrowBackCircleOutline/></button>
        </span>
          <h1 className="text-2xl font-semibold">Report Post</h1>
          <p className="text-amber-300 font-semibold text-lg py-3">
           ! Please provide a reason for reporting this post.
          </p>
          <textarea
              id="reason"
              name="reason"
              rows="5"
              className="border border-slate-200 focus:outline-none rounded-md p-2"
              value={reason}
              onChange={handleReasonChange}
              required={true}
              placeholder='tell us the reason...'
          ></textarea>
          <div className="flex justify-end mt-3">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={reportHandler}
                disabled={isDisabled}
                style={{ display: isDisabled ? "none" : "block" }}
            >
              {isLoading ? "Loading..." : "Report"}
            </button>
        </div>

        </div>
      </div>





    </>
  );
};

export default ReportPost;
