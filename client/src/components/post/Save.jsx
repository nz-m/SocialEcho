import React, { useEffect, useState } from "react";
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
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      await dispatch(getSavedPostsAction());
      setIsFetching(false);
    };

    fetchSavedPosts();
  }, [dispatch]);

  const savedPosts = useSelector((state) => state.posts.savedPosts);
  const savedPostsIds = savedPosts.map((post) => post._id);

  useEffect(() => {
    if (savedPostsIds.includes(postId)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [savedPostsIds, postId]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(true);
    dispatch(savePostAction(postId)).then(() => setIsSaving(false));
  };

  const handleUnsave = async () => {
    setIsSaving(true);
    setSaved(false);
    dispatch(unsavePostAction(postId)).then(() => setIsSaving(false));
  };

  return (
    <>
      {isFetching ? (
        "Loading..."
      ) : (
        <button
          key={postId}
          onClick={saved ? handleUnsave : handleSave}
          className="flex items-center text-xl gap-1"
          disabled={isSaving}
        >
          <HiShoppingCart />
          {isSaving ? "Saving..." : saved ? "Remove from Saved" : "Save"}
        </button>
      )}
    </>
  );
};

export default Save;
