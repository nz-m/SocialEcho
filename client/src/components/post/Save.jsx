import React, { useEffect, useState, memo } from "react";
import { HiOutlineFolderOpen } from "react-icons/hi2";
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
      className="flex items-center text-xl gap-1"
      disabled={isSaving}
    >
      <HiOutlineFolderOpen />
      {isSaving ? "Saving..." : saved ? "Remove from Saved" : "Save"}
    </button>
  );
};

export default memo(Save);
