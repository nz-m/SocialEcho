import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineReport } from "react-icons/md";
import { deletePostAction } from "../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getCommunityAction } from "../../redux/actions/communityActions";
import Save from "./Save";
import Like from "./Like";
import CommentForm from "../form/CommentForm";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

const PostView = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth?.userData);
  const { body, fileUrl, user, community, createdAt, comments } = post;
  const [isReported, setIsReported] = useState(null);

  // Memoize the file extension check to avoid recomputing it unnecessarily
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

  const deleteHandler = async () => {
    try {
      await dispatch(deletePostAction(post._id));
      navigate(location.state ? location.state.from : "/");
    } catch (error) {
      console.log(error);
    }
  };

  const reportHandler = () => {
    navigate(`/community/${community.name}/report`, {
      state: { post, communityName: community.name },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="px-6 py-6 rounded-xl shadow-xl bg-white border border-gray-100">
      <span className="text-blue-500 font-bold">
        <button onClick={handleBack}>Go back</button>
      </span>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            className="rounded-full overflow-hidden"
            src={user.avatar}
            alt="user avatar"
            style={{ width: "50px" }}
            loading="lazy"
          />
          <div className="">
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
              className="text-sm text-gray-500"
            >
              {community.name}
            </Link>
          </div>
        </div>
        <p>{createdAt}</p>
      </div>

      <div>
        <p className="text-lg">{body}</p>
        <div className="flex justify-center">
          {fileUrl && isImageFile ? (
            <img
              className="w-[800px] h-auto rounded-xl mt-3"
              src={fileUrl}
              alt={body}
              loading="lazy"
            />
          ) : (
            fileUrl && (
              <video
                className="w-[800px] h-auto rounded-xl mt-3"
                src={fileUrl}
                controls
              />
            )
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {/* like button here */}
            <Like post={post} />
            <button className="flex items-center text-xl gap-1">
              {" "}
              <HiOutlineChatBubbleOvalLeft />
              {comments.length}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Save postId={post._id} />
            {isReported === null ? null : isReported ? (
              <button disabled className="flex items-center text-xl gap-1">
                {" "}
                <MdOutlineReport />
                Reported
              </button>
            ) : (
              <button
                onClick={reportHandler}
                className="flex items-center text-xl gap-1"
              >
                {" "}
                <MdOutlineReport />
                Report
              </button>
            )}

            {userData?._id === post.user._id && (
              <button
                onClick={deleteHandler}
                className="flex items-center text-xl gap-1"
              >
                <MdOutlineReport />
                Delete
              </button>
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
