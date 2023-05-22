import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineArchiveBox,
} from "react-icons/hi2";
import DeleteModal from "../modals/DeleteModal";
import Like from "./Like";
import { FcNext } from "react-icons/fc";
import "react-photo-view/dist/react-photo-view.css";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.auth?.userData);

  const { content, fileUrl, user, community, createdAt, comments } = post;

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
    <div className="px-6 py-6 rounded-xl shadow-xl bg-white shadow-[#F3F8FF] mb-6 font-sans">
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
              <Link
                to="/profile"
                className="text-base font-semibold capitalize"
              >
                {user.name}
              </Link>
            ) : (
              <Link
                to={`/user/${user._id}`}
                className="text-base font-semibold capitalize"
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
        <p className="text-md text-justify mt-2">{content}</p>
        <div className="flex justify-center">
          {fileUrl && isImageFile ? (
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
                  className="cursor-pointer h-auto rounded-xl mt-3"
                />
              </PhotoView>
            </PhotoProvider>
          ) : (
            fileUrl && (
              <video
                className="block mx-auto rounded-md shadow-md focus:outline-none"
                src={fileUrl}
                controls
                style={{ maxWidth: "100%", height: "auto" }}
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
        <div className="flex justify-center items-center gap-4 cursor-pointer">
          <div className="flex items-center gap-2">
            {userData?._id === post.user._id && (
              <button
                onClick={() => toggleModal(true)}
                className="flex items-center text-xl gap-1"
              >
                {" "}
                <HiOutlineArchiveBox className="text-red-500" />
              </button>
            )}
          </div>
          <FcNext
            onClick={() => {
              navigate(`/post/${post._id}`, {
                state: { from: location.pathname },
              });
            }}
            className="text-xl"
          />
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
