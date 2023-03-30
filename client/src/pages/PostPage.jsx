import React from "react";
import Leftbar from "../components/home/LeftBar";
import PostView from "../components/post/PostView";
import CommentSidebar from "../components/post/CommentSidebar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostsAction } from "../redux/actions/postActions";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth?.userData);
  const post = useSelector((state) =>
    state.posts?.posts.find((post) => post._id === postId)
  );

  useEffect(() => {
    if (userData) {
      dispatch(getPostsAction());
    }
  }, [userData, dispatch]);

  if (!post) return null; // add loading spinner here

  return (
    <div className="flex mx-6">
      <Leftbar />

      <div>
        <h1 className="text-2xl font-bold text-gray-700">Post</h1>

        <PostView post={post} />
      </div>

      <CommentSidebar />
    </div>
  );
};

export default PostPage;
