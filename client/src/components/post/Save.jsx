import React, { useEffect, useRef, useState } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  savePostAction,
  unsavePostAction,
  getSavedPostsAction,
} from "../../redux/actions/postActions";

const Save = ({ postId }) => {
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const savedPosts = useSelector((state) => state.posts?.savedPosts);
  const savedPostsIds = useRef(savedPosts.map((post) => post._id));

  useEffect(() => {
    const fetchSavedPosts = async () => {
      await dispatch(getSavedPostsAction());
    };
    fetchSavedPosts();
  }, [dispatch]);

  useEffect(() => {
    if (savedPostsIds.current.includes(postId)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [postId]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await dispatch(savePostAction(postId));
      setSaved(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUnsave = async () => {
    try {
      setIsSaving(true);
      await dispatch(unsavePostAction(postId));
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
      <HiShoppingCart />
      {isSaving ? "Saving..." : saved ? "Remove from Saved" : "Save"}
    </button>
  );
};

export default Save;
