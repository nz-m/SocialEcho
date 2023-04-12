import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { HiOutlineChatBubbleOvalLeft,HiOutlineArchiveBox } from "react-icons/hi2";
import DeleteModal from "../modals/DeleteModal";
import Like from "./Like";
import {BiDotsHorizontalRounded} from 'react-icons/bi'
const Post = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.auth?.userData);

  const { body, fileUrl, user, community, createdAt, comments } = post;

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
    <div className="px-6 py-6 rounded-xl shadow-xl bg-white shadow-[#F3F8FF] mb-6">
      <div className="flex items-start justify-between">
        <div className="flex  gap-2">
          <img
            className="rounded-full overflow-hidden"
            src={user.avatar}
            alt="user avatar"
            style={{ width: "50px" }}
            loading="lazy"
          />
          <div className="flex flex-col">
            {userData._id === user._id ? (
              <Link to="/profile" className="text-base font-semibold capitalize">
                {user.name}
              </Link>
            ) : (
              <Link to={`/user/${user._id}`} className="text-base font-semibold capitalize">
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
        <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500">{createdAt}</p>
        <BiDotsHorizontalRounded className="text-lg cursor-pointer"/>
        </div>
       
      </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(`/post/${post._id}`, {
            state: { from: location.pathname },
          });
        }}
      >
        <p className="text-md text-justify mt-2">{body}</p>
        <div className="flex justify-center">
          {fileUrl && isImageFile ? (
            <img
              className=" h-auto rounded-xl mt-3"
              src={fileUrl}
              alt={body}
              loading="lazy"
            />
          ) : (
            fileUrl && (
              <video
                className=" h-auto rounded-xl mt-3"
                src={fileUrl}
                controls
              />
            )
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
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
              <HiOutlineArchiveBox className="text-red-500"/>
              
            </button>
          )}
        </div>

        {showModal && (
          <DeleteModal
            showModal={showModal}
            postId={post._id}
            onClose={() => toggleModal(false)}
            prevPath={location.pathname}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
