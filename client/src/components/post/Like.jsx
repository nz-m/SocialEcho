import React from "react";
import { HiOutlineHandThumbUp, HiHandThumbUp } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { likePostAction, unlikePostAction } from "../../redux/actions/postActions";
import { useSelector } from "react-redux";
import { useState } from "react";

const Like = ({ post }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const [liked, setLiked] = useState(post.likes.includes(userData.id));

  const { _id, likes } = post;

  const toggleLike = (e) => {
    if (liked) {
      dispatch(unlikePostAction(_id, userData.id));
      setLiked(false);
    } else {
      dispatch(likePostAction(_id, userData.id));
      setLiked(true);
    }
  };

  return (
    <>
      <button
        onClick={toggleLike}
        className="flex items-center text-xl cursor-pointer gap-1"
      >
        {liked ? <HiHandThumbUp /> : <HiOutlineHandThumbUp />} {likes.length}
      </button>
    </>
  );
};

export default Like;
