import React from "react";
import Post from "./Post";
const MainSection = () => {
  return (
    <section className="flex-grow mx-10 my-5">
      <div className="flex justify-center items-center h-32 bg-gray-200 rounded-lg shadow-xl mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Welcome to My App</h1>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Post />

        <Post />

        <Post />
      </div>
    </section>
  );
};

export default MainSection;
