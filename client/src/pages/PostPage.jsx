import React from "react";
import Leftbar from "../components/home/LeftBar";
import Navbar from "../components/home/Navbar";
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
    <div className="bg-[#F6F7FA]">
      <Navbar />
      <div className="flex lg:px-40 gap-10 mx-auto bg-[#F6F7FA]">
        <Leftbar />

        <PostView  post={post} />

        <CommentSidebar />
      </div>
    </div>
  );
};

export default PostPage;
