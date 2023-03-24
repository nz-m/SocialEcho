import React, { useMemo, useState } from "react";
import { MdOutlineReport } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import DeleteModal from "../modals/DeleteModal";
import Like from "./Like";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.auth?.userData);

  const { body, fileUrl, user, community, createdAt, comments } = post;

  // Memoize the file extension check to avoid recomputing it unnecessarily
  const isImageFile = useMemo(() => {
    const validExtensions = [".jpg", ".png", ".jpeg", ".gif", ".webp", ".svg"];
    const fileExtension = fileUrl?.slice(fileUrl.lastIndexOf("."));
    return validExtensions.includes(fileExtension);
  }, [fileUrl]);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = (value) => {
    setShowModal(value);
  };

  return (
    <div className="px-6 py-6 rounded-xl shadow-xl bg-white border border-gray-100">
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
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(`/post/${post._id}`, {
            state: { from: location.pathname },
          });
        }}
      >
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
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          {/* like button here */}
          <Like post={post} />
          <Link to={`/post/${post._id}`}>
            <button className="flex items-center text-xl gap-1">
              {" "}
              <HiOutlineChatBubbleOvalLeft />
              {comments.length}
            </button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {userData?._id === post.user._id && (
            <button
              onClick={() => toggleModal(true)}
              className="flex items-center text-xl gap-1"
            >
              {" "}
              <MdOutlineReport />
              Delete
            </button>
          )}
        </div>

        {showModal && (
          <DeleteModal
            showModal={showModal}
            postId={post._id}
            onClose={() => toggleModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
