import React from "react";
import PostView from "../components/post/PostView";
import CommentSidebar from "../components/post/CommentSidebar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostAction, clearPostAction } from "../redux/actions/postActions";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth?.userData);
  const post = useSelector((state) => state.posts?.post);

  useEffect(() => {
    if (userData?._id) {
      dispatch(getPostAction(postId));
    }

    return () => {
      dispatch(clearPostAction());
    };
  }, [dispatch, userData, postId]);

  if (!post) return null; // add loading spinner here

  return (
    <>
      <PostView post={post} />
      <CommentSidebar />
    </>
  );
};

export default PostPage;
