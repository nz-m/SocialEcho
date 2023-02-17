import React from "react";
import Form from "../components/form/Form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
import { useEffect } from "react";
import Leftbar from "../components/home/LeftBar";
import MainSection from "../components/community/MainSection";
import RightBar from "../components/community/RightBar";

const CommunityPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state.posts);

  return (
    <div>
      {/* <div>showing all the posts from the database</div>
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
      <h1>Community Page</h1>
      <Form /> */}
      <div className="flex justify-center">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2">
              <Leftbar />
            </div>
            <div className="col-span-8">
              <MainSection />
            </div>
            <div className="col-span-2">
              <RightBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
