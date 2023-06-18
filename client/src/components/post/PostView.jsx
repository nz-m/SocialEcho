import { useEffect, useState } from "react";
import { HiOutlineArchiveBox } from "react-icons/hi2";
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
import ReportPostModal from "../modals/ReportPostModal";
import { VscReport } from "react-icons/vsc";
import Tooltip from "../shared/Tooltip";
const PostView = ({ post, userData }) => {
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    content,
    fileUrl,
    fileType,
    user,
    community,
    dateTime,
    comments,
    savedByCount,
    isReported,
  } = post;

  useEffect(() => {
    dispatch(getCommunityAction(community.name)).then(() => setLoading(false));
  }, [dispatch, community.name, loading]);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = (value) => {
    setShowModal(value);
  };

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReportedPost, setIsReportedPost] = useState(isReported);

  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const handleReportClose = () => {
    setIsReportModalOpen(false);
  };

  if (loading) {
    return (
      <div className="main-section flex justify-center items-center">
        <CommonLoading />
      </div>
    );
  }

  return (
    <div className="main-section border p-5 bg-white">
      <p className="border border-dashed border-primary cursor-pointer px-2 py-2 w-7 h-7 flex justify-center items-center mb-3 rounded-full">
        <IoIosArrowBack
          className="text-primary text-sm font-semibold"
          onClick={() => navigate(location.state?.from || "/")}
        />
      </p>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            className="rounded-full overflow-hidden w-[50px] h-[50px] object-cover"
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
          {fileUrl && fileType === "image" ? (
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
                  className="w-full aspect-square object-cover rounded-md mt-3 cursor-pointer"
                  src={fileUrl}
                  alt={content}
                  loading="lazy"
                />
              </PhotoView>
            </PhotoProvider>
          ) : (
            fileUrl && (
              <video
                className="w-full aspect-video rounded-md mt-3"
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
              <HiOutlineChatBubbleOvalLeft className="text-2xl" />
              <span className="text-lg">{comments.length}</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Save postId={post._id} />

            <Tooltip text="Saved by">
              <span className="flex justify-center items-center">
                <HiOutlineArchiveBox className="text-2xl" />
                {savedByCount}
              </span>
            </Tooltip>

            {isReportedPost ? (
              <Tooltip text="Reported">
                <button disabled className="text-green-500">
                  <VscReport className="text-2xl" />
                </button>
              </Tooltip>
            ) : (
              <Tooltip text="Report">
                <button onClick={handleReportClick}>
                  <VscReport className="text-2xl" />
                </button>
              </Tooltip>
            )}

            {userData?._id === post.user._id && (
              <Tooltip text="Delete">
                <button
                  onClick={() => toggleModal(true)}
                  className="text-red-500"
                >
                  <HiOutlineArchiveBox className="text-2xl" />
                </button>
              </Tooltip>
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

      <ReportPostModal
        isOpen={isReportModalOpen}
        onClose={handleReportClose}
        postId={post._id}
        communityId={community._id}
        setReportedPost={setIsReportedPost}
      />

      <div>
        <CommentForm communityId={community._id} postId={post._id} />
      </div>
    </div>
  );
};

export default PostView;
