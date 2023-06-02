import { useState } from "react";
import { reportPostAction } from "../../redux/actions/communityActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ReportPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const post = location.state?.post;
  const userData = useSelector((state) => state.auth?.userData);

  if (!userData) {
    navigate("/");
  }

  const reportHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        reportPostAction({
          postId: post._id,
          reportReason: reason,
          communityId: post.community,
        })
      );
      setIsLoading(false);
      navigate(-1);
    } catch (error) {
      setIsLoading(false);
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
      <div className="col-span-2">
        <div className="flex flex-col w-full bg-white px-10 rounded-2xl shadow-2xl shadow-[#F3F8FF] py-10">
          <span className="text-blue-500 text-4xl ">
            <button onClick={handleBack}>
              <IoArrowBackCircleOutline />
            </button>
          </span>
          <h1 className="text-2xl font-semibold">Report Post</h1>
          <p className="text-gray-500 my-2">{post?.content}</p>
          <textarea
            id="reason"
            name="reason"
            rows="5"
            className="border border-slate-200 focus:outline-none rounded-md p-2"
            value={reason}
            onChange={handleReasonChange}
            required={true}
            placeholder="Reason for reporting"
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
