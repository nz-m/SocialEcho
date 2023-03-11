import React, { useState } from "react";
import { HiOutlineHandThumbUp, HiHandThumbUp } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  likePostAction,
  unlikePostAction,
} from "../../redux/actions/postActions";

const Like = ({ post }) => {
  const dispatch = useDispatch();
  const { _id, likes } = post;
  const userData = useSelector((state) => state.auth.userData);
  const [liked, setLiked] = useState(post.likes.includes(userData.id));
  const [localLikes, setLocalLikes] = useState(likes.length);

  const toggleLike = async (e) => {
    e.preventDefault();
    const optimisticLikes = liked ? localLikes - 1 : localLikes + 1;
    setLocalLikes(optimisticLikes);
    setLiked(!liked);

    try {
      if (liked) {
        await dispatch(unlikePostAction(_id, userData.id));
      } else {
        await dispatch(likePostAction(_id, userData.id));
      }
    } catch (error) {
      console.log(error);
      setLiked(liked);
      setLocalLikes(localLikes);
    }
  };

  return (
    <>
      <button
        onClick={toggleLike}
        className="flex items-center text-xl cursor-pointer gap-1"
      >
        {liked ? <HiHandThumbUp /> : <HiOutlineHandThumbUp />} {localLikes}
      </button>
    </>
  );
};

export default Like;
