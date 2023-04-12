import React, { useEffect, useMemo, useState } from "react";
import { HiOutlineArchiveBox,HiOutlineInformationCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getCommunityAction } from "../../redux/actions/communityActions";
import Save from "./Save";
import Like from "./Like";
import CommentForm from "../form/CommentForm";
import { HiOutlineChatBubbleOvalLeft ,HiOutlineChevronLeft} from "react-icons/hi2";
import DeleteModal from "../modals/DeleteModal";
import {IoIosArrowBack} from 'react-icons/io'
const PostView = ({ post }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth?.userData);
  const { body, fileUrl, user, community, createdAt, comments, savedByCount } =
    post;
  const [isReported, setIsReported] = useState(null);

  const isImageFile = useMemo(() => {
    const validExtensions = [".jpg", ".png", ".jpeg", ".gif", ".webp", ".svg"];
    const fileExtension = fileUrl?.slice(fileUrl.lastIndexOf("."));
    return validExtensions.includes(fileExtension);
  }, [fileUrl]);

  const communityData = useSelector((state) => state.community.communityData);
  const userId = userData._id;
  useEffect(() => {
    dispatch(getCommunityAction(community.name));
  }, [dispatch, community.name]);

  useEffect(() => {
    if (communityData && userId) {
      const reportedPosts = communityData.reportedPosts;
      if (reportedPosts && reportedPosts.length > 0) {
        const isReportedPost = reportedPosts.some(
          (reportedPost) =>
            reportedPost.reportedBy === userId && reportedPost.post === post._id
        );
        setIsReported(isReportedPost || false);
      } else {
        setIsReported(false);
      }
    }
  }, [communityData, post._id, userId]);

  const reportHandler = () => {
    navigate(`/community/${community.name}/report`, {
      state: { post, communityName: community.name },
    });
  };
  const [showModal, setShowModal] = useState(false);
  const toggleModal = (value) => {
    setShowModal(value);
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-6/12 px-5 py-5 bg-white shadow-2xl shadow-[#F3F8FF] my-5 rounded-lg">
      <p className="border border-dashed border-primary cursor-pointer px-2 py-2 w-7 h-7 flex justify-center items-center mb-3 rounded-full">
       <IoIosArrowBack className="text-primary text-xl font-semibold" onClick={handleBack}/>
       
      </p>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            className="rounded-full overflow-hidden"
            src={user.avatar}
            alt="user avatar"
            style={{ width: "50px" }}
            loading="lazy"
          />
          <div className="flex flex-col">
            {userData._id === user._id ? (
              <Link to="/profile" className="text-lg font-semibold">
                {user.name}
              </Link>
            ) : (
              <Link to={`/user/${user._id}`} className="text-lg font-semibold">
                {user.name}
              </Link>
            )}
            <Link
              to={`/community/${community.name}`}
              className="text-xs text-gray-500"
            >
              {community.name}
            </Link>
          </div>
        </div>
        <p>{createdAt}</p>
      </div>

      <div>
        <p className="text-lg mt-3">{body}</p>
        <div className="flex justify-center">
          {fileUrl && isImageFile ? (
            <img
              className="w-full h-auto rounded-xl mt-3"
              src={fileUrl}
              alt={body}
              loading="lazy"
            />
          ) : (
            fileUrl && (
              <video
                className="w-full h-auto rounded-xl mt-3"
                src={fileUrl}
                controls
              />
            )
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Like post={post} />
            <button className="flex items-center text-xl gap-1">
              {" "}
              <HiOutlineChatBubbleOvalLeft />
              {comments.length}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Save postId={post._id} />
            {/* <span>
              Saved by {savedByCount} {savedByCount === 1 ? "person" : "people"}
            </span> */}
            {isReported === null ? null : isReported ? (
              <button disabled className="flex items-center text-xl gap-1">
                {" "}
                <HiOutlineInformationCircle />
                Reported
              </button>
            ) : (
              <button
                onClick={reportHandler}
                className="flex items-center text-xl gap-1"
              >
                {" "}
                <HiOutlineInformationCircle />
                Report
              </button>
            )}

            {userData?._id === post.user._id && (
              <button
                onClick={() => toggleModal(true)}
                className="flex items-center text-xl gap-1"
              >
                {" "}
                <HiOutlineArchiveBox />
                Delete
              </button>
            )}
            {showModal && (
              <DeleteModal
                showModal={showModal}
                postId={post._id}
                onClose={() => toggleModal(false)}
                prevPath={location.state.from || "/"}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <CommentForm communityId={community._id} />
      </div>
    </div>
  );
};

export default PostView;
