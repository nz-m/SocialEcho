import React from "react";
import Form from "../components/form/Form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
import { useEffect } from "react";

const CommunityPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state.posts);

  return (
    <div>
      <div>showing all the posts from the database</div>
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
      <h1>Community Page</h1>
      <Form />
    </div>
  );
};

export default CommunityPage;
