import React from "react";
import Post from "../post/Post";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostsAction } from "../../redux/actions/postActions";
const MainSection = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth?.userData);
  const posts = useSelector((state) => state.posts?.posts);


  useEffect(() => {
    if (userData) {
      dispatch(getPostsAction(userData.id));
    }
  }, [userData, dispatch]);

  if (!posts) return null; // add loading spinner here
  return (
    <div className="w-6/12">
      <div className="flex justify-center items-center h-32 bg-gray-200 rounded-lg shadow-xl mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Welcome</h1>
      </div>
      <div>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MainSection;
