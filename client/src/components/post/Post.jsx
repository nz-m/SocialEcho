import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineArchiveBox,
} from "react-icons/hi2";
import DeleteModal from "../modals/DeleteModal";
import Like from "./Like";
import "react-photo-view/dist/react-photo-view.css";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.auth?.userData);

  const { content, fileUrl, fileType, user, community, createdAt, comments } =
    post;

  const [showModal, setShowModal] = useState(false);
  const toggleModal = (value) => {
    setShowModal(value);
  };

  return (
    <div className="border rounded bg-white mb-6 hover:shadow duration-300 p-4 m-2">
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <img
            className="rounded-full overflow-hidden w-[50px] h-[50px] object-cover"
            src={user.avatar}
            alt="user avatar"
            loading="lazy"
          />
          <div className="flex flex-col">
            {userData._id === user._id ? (
              <Link to="/profile" className="font-semibold capitalize">
                {user.name}
              </Link>
            ) : (
              <Link
                to={`/user/${user._id}`}
                className="font-semibold capitalize"
              >
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
        <p className="text-sm text-gray-500">{createdAt}</p>
      </div>
      <div>
        <p
          onClick={() => {
            navigate(`/post/${post._id}`, {
              state: { from: location.pathname },
            });
          }}
          className="text-md mt-2 whitespace-normal cursor-pointer break-words"
        >
          {content}
        </p>
        <div className="flex justify-center">
          {fileUrl && fileType === "image" ? (
            <PhotoProvider
              overlayRender={() => (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-10 text-white px-3 py-2">
                  <p className="text-xs">{user.name}</p>
                  <p className="text-xs">{community.name}</p>
                  <p className="text-xs">{createdAt}</p>
                </div>
              )}
            >
              <PhotoView src={fileUrl}>
                <img
                  src={fileUrl}
                  alt={content}
                  loading="lazy"
                  className="cursor-pointer h-auto rounded-md mt-3"
                />
              </PhotoView>
            </PhotoProvider>
          ) : (
            fileUrl && (
              <video
                className="block mx-auto rounded-md focus:outline-none max-w-full max-h-screen"
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
            <button className="flex items-center text-lg gap-1">
              {" "}
              <HiOutlineChatBubbleOvalLeft className="text-2xl" />
              {comments.length}
            </button>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-4 cursor-pointer">
          <div className="flex items-center gap-2">
            {userData?._id === post.user._id && (
              <button
                onClick={() => toggleModal(true)}
                className="flex items-center text-xl gap-1"
              >
                {" "}
                <HiOutlineArchiveBox className="text-red-500 text-2xl" />
              </button>
            )}
          </div>
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
