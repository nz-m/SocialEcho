import React from "react";
import { getSavedPostsAction } from "../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Leftbar from "../components/home/LeftBar";
import RightBar from "../components/home/RightBar";
import SavedPost from "../components/post/SavedPost";
import Navbar from "../components/home/Navbar";
const Saved = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedPostsAction());
  }, [dispatch]);

  const savedPosts = useSelector((state) => state.posts?.savedPosts);

  return (
    <div className="bg-[#F6F7FA]">
    <Navbar />
    <div className="flex lg:px-40 mx-auto bg-[#F6F7FA]">
      <Leftbar />

      <div className="w-6/12 px-10 py-6">
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
    </div>
  );
};

export default Saved;
