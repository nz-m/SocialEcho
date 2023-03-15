import React from "react";
import { getSavedPostsAction } from "../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Leftbar from "../components/home/LeftBar";
import RightBar from "../components/home/RightBar";
import SavedPost from "../components/post/SavedPost";

const Saved = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedPostsAction());
  }, [dispatch]);

  const savedPosts = useSelector((state) => state.posts.savedPosts);

  return (
    <div className="flex mx-6">
      <Leftbar />

      <div className="w-6/12">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Saved Posts</h1>
          {savedPosts && savedPosts.length > 0 ? (
            <div className="flex flex-col items-center">
              {savedPosts.reverse().map((post) => (
                <SavedPost key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div>You have not saved any posts yet.</div>
          )}
        </div>
      </div>

      <RightBar />
    </div>
  );
};

export default Saved;
