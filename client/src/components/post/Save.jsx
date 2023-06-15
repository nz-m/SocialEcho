import { useEffect, useState, memo } from "react";
import {
  HiOutlineArchiveBoxArrowDown,
  HiOutlineArchiveBoxXMark,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  savePostAction,
  unsavePostAction,
  getSavedPostsAction,
  increaseSavedByCount,
  decreaseSavedByCount,
} from "../../redux/actions/postActions";

const Save = ({ postId }) => {
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const savedPosts = useSelector((state) => state.posts?.savedPosts);
  const savedPostsIds = savedPosts.map((post) => post._id);

  useEffect(() => {
    dispatch(getSavedPostsAction());
  }, [dispatch]);

  useEffect(() => {
    if (savedPostsIds.includes(postId)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [postId, savedPostsIds]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await dispatch(savePostAction(postId));
      dispatch(increaseSavedByCount(postId));
      setSaved(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUnsave = async () => {
    try {
      setIsSaving(true);
      await dispatch(unsavePostAction(postId));
      dispatch(decreaseSavedByCount(postId));
      setSaved(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={saved ? handleUnsave : handleSave}
      className="transititext-black flex items-center gap-1 text-black transition duration-150 ease-in-out  mr-2"
      data-te-toggle="tooltip"
      title=" Save"
      disabled={isSaving}
    >
      {isSaving ? (
        "Saving..."
      ) : saved ? (
        <HiOutlineArchiveBoxXMark
          className="transititext-black text-2xl text-black transition duration-150 ease-in-out  "
          data-te-toggle="tooltip"
          title=" Remove From Saved"
        />
      ) : (
        <HiOutlineArchiveBoxArrowDown
          className="transititext-black text-2xl text-black transition duration-150 ease-in-out  "
          data-te-toggle="tooltip"
          title="Save Post"
        />
      )}
    </button>
  );
};

export default memo(Save);
