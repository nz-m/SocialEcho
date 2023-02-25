import React from "react";
import PostForm from "../form/PostForm";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostsAction } from "../../actions/postActions";

const MainSection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  const community = useSelector((state) => state.community.communityData);
  if (!community) return null;

  return (
    <div className="flex-grow h-full bg-gray-100">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          This is {community.name} eduaction community (in main section)
        </h1>
        <div className="flex flex-col mt-4">
          <div className="mb-4">
            <PostForm />
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <p className="text-xl font-semibold my-5">
              {" "}
              Recent post form this community
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
