import { useEffect, useMemo, useState } from "react";
import {
  HiOutlineArchiveBox,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getCommunityAction } from "../../redux/actions/communityActions";
import Save from "./Save";
import Like from "./Like";
import CommentForm from "../form/CommentForm";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import DeleteModal from "../modals/DeleteModal";
import { IoIosArrowBack } from "react-icons/io";
import CommonLoading from "../loader/CommonLoading";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
const PostView = ({ post, userData }) => {
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    content,
    fileUrl,
    user,
    community,
    dateTime,
    comments,
    savedByCount,
    isReported,
  } = post;

  const isImageFile = useMemo(() => {
    const validExtensions = [".jpg", ".png", ".jpeg", ".gif", ".webp", ".svg"];
    const fileExtension = fileUrl?.slice(fileUrl.lastIndexOf("."));
    return validExtensions.includes(fileExtension);
  }, [fileUrl]);

  useEffect(() => {
    dispatch(getCommunityAction(community.name)).then(() => setLoading(false));
  }, [dispatch, community.name, loading]);

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

  if (loading) {
    return (
      <div className="main-section flex justify-center items-center">
        <CommonLoading />
      </div>
    );
  }

  return (
    <div className="main-section border p-5 bg-white shadow-2xl shadow-[#f2f5fc]">
      <p className="border border-dashed border-primary cursor-pointer px-2 py-2 w-7 h-7 flex justify-center items-center mb-3 rounded-full">
        <IoIosArrowBack
          className="text-primary text-sm font-semibold"
          onClick={handleBack}
        />
      </p>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            className="rounded-md overflow-hidden w-10"
            src={user.avatar}
            alt="user avatar"
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

        <span className="text-gray-500 text-sm self-center">{dateTime}</span>
      </div>

      <div>
        <p className="mt-3">{content}</p>
        <div className="flex justify-center">
          {fileUrl && isImageFile ? (
            <PhotoProvider
              overlayRender={() => (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-10 text-white px-3 py-2">
                  <p className="text-xs">{user.name}</p>
                  <p className="text-xs">{community.name}</p>
                  <p className="text-xs">{dateTime}</p>
                </div>
              )}
            >
              <PhotoView src={fileUrl}>
                <img
                  className="w-full h-auto rounded-md mt-3 cursor-pointer"
                  src={fileUrl}
                  alt={content}
                  loading="lazy"
                />
              </PhotoView>
            </PhotoProvider>
          ) : (
            fileUrl && (
              <video
                className="max-w-sm h-auto rounded-md mt-3"
                src={fileUrl}
                controls
              />
            )
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Like post={post} />
            <button className="flex items-center space-x-1">
              <HiOutlineChatBubbleOvalLeft />
              <span>{comments.length}</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Save postId={post._id} />
            <span>
              Saved by {savedByCount} {savedByCount === 1 ? "person" : "people"}
            </span>
            {isReported ? (
              <button disabled className="flex items-center space-x-1">
                <HiOutlineInformationCircle />
                <span>Reported</span>
              </button>
            ) : (
              <button
                onClick={reportHandler}
                className="flex items-center space-x-1"
              >
                <HiOutlineInformationCircle />
                <span>Report</span>
              </button>
            )}
            {userData?._id === post.user._id && (
              <button
                onClick={() => toggleModal(true)}
                className="flex items-center space-x-1"
              >
                <HiOutlineArchiveBox />
                <span>Delete</span>
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
        <CommentForm communityId={community._id} postId={post._id} />
      </div>
    </div>
  );
};

export default PostView;
