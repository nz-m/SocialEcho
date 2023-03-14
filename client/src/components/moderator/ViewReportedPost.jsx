import React, { useMemo } from "react";
import { deletePostAction } from "../../redux/actions/postActions";
import { removeReportedPostAction } from "../../redux/actions/communityActions";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

const ViewReportedPost = ({ post }) => {
  const { communityName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, body, fileUrl, user, createdAt } = post;
  const { name, avatar } = user;
  const createdAtString = new Date(createdAt).toDateString();

  const onRemove = () => {
    dispatch(deletePostAction(_id)).then(() => {
      //navigate to previous page
      navigate(-1);
    });
  };

  const onNoAction = () => {
    dispatch(removeReportedPostAction(communityName, _id)).then(() => {
      //navigate to previous page
      navigate(-1);
    });
  };

  const isImageFile = useMemo(() => {
    const validExtensions = [".jpg", ".png", ".jpeg", ".gif", ".webp", ".svg"];
    const fileExtension = fileUrl?.slice(fileUrl.lastIndexOf("."));
    return validExtensions.includes(fileExtension);
  }, [fileUrl]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img className="w-8 h-8 rounded-full mr-2" src={avatar} alt="user" />
          <div className="text-sm font-medium text-gray-700">{name}</div>
        </div>
        <div className="text-sm text-gray-500">{createdAtString}</div>
      </div>
      <div className="text-lg mb-4">{body}</div>
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

      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2"
          onClick={onRemove}
        >
          Remove
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={onNoAction}
        >
          No Action
        </button>
      </div>
    </div>
  );
};

export default ViewReportedPost;
