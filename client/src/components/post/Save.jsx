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
    try {
      setIsSaving(true);
      setSaved(true);
      await dispatch(savePostAction(postId));
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUnsave = async () => {
    try {
      setIsSaving(true);
      setSaved(false);
      await dispatch(unsavePostAction(postId));
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
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
