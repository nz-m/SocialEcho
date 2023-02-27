import React from "react";
import Post from "../post/Post";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostsAction } from "../../actions/postActions";
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
    <section className="flex-grow mx-10 my-5">
      <div className="flex justify-center items-center h-32 bg-gray-200 rounded-lg shadow-xl mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Welcome to My App</h1>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default MainSection;
