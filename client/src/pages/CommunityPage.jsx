import React from "react";
import Form from "../components/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Leftbar from "../components/home/LeftBar";
import MainSection from "../components/community/MainSection";
import RightBar from "../components/community/RightBar";
import { useParams } from "react-router-dom";
import { getCommunityAction } from "../actions/communityAction";

const CommunityPage = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  useEffect(() => {
    dispatch(getCommunityAction(name));
  }, [dispatch, name]);

  const communityData = useSelector((state) => state.communityData);

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
      <div className="mx-6">
        <div className="flex justify-between">
          This is the community page for {name}
          <Leftbar />
          <MainSection />
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
