import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import { useSelector, useDispatch } from "react-redux";
import { getPublicPostsAction } from "../../redux/actions/postActions";
import CommonLoading from "../loader/CommonLoading";

const PublicPost = ({ publicUserId }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const publicPosts = useSelector((state) => state.posts?.publicPosts);

  useEffect(() => {
    const getPublicPosts = async () => {
      setLoading(true);
      await dispatch(getPublicPostsAction(publicUserId));
      setLoading(false);
    };
    getPublicPosts();
  }, [dispatch, publicUserId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <CommonLoading />
      </div>
    );
  }

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold my-3">Posts</h1>
      {publicPosts?.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {publicPosts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicPost;
