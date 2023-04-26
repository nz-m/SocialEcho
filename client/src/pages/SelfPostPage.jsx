import PostView from "../components/post/PostView";
import CommentSidebar from "../components/post/CommentSidebar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSelfPostAction } from "../redux/actions/postActions";
import { useParams } from "react-router-dom";

const SelfPostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth?.userData);
  const post = useSelector((state) => state.posts?.selfPost);

  useEffect(() => {
    if (userData) {
      dispatch(getSelfPostAction(postId));
    }
  }, [userData, dispatch, postId]);

  if (!post) return null; // add loading spinner here

  return (
    <>
      <PostView post={post} />
      <CommentSidebar />
    </>
  );
};

export default SelfPostPage;
