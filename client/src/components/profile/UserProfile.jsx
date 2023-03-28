import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAction } from "../../redux/actions/userActions";
import PostOnProfile from "../post/PostOnProfile";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth?.userData);
  const user = useSelector((state) => state.user?.user);

  const posts = user.posts;

  useEffect(() => {
    dispatch(getUserAction(userData._id));
  }, [dispatch, userData._id]);

  let posttoShow = null;

  if (posts) {
    const postsWithUser = posts.map((post) => {
      return {
        ...post,
        createdAt: new Date(post.createdAt).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      };
    });
    posttoShow = postsWithUser
      .reverse()
      .map((post) => <PostOnProfile key={post._id} post={post} />);
  }
  return (
    <div className="w-6/12 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={user.avatar}
            alt="Profile"
          ></img>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            {user.bio ? (
              <p className="text-gray-600">{user.bio}</p>
            ) : (
              <p className="text-gray-400">bio not added</p>
            )}

            {user.location ? (
              <p className="text-gray-600">{user.location}</p>
            ) : (
              <p className="text-gray-400">Location not added</p>
            )}
          </div>
        </div>
        <Link
          to="/edit-profile"
          state={{ userInfo: user }}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Edit Profile
        </Link>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Interests</h3>
        {user.interests &&
          user.interests.filter((interest) => interest !== "").length > 0 && (
            <ul className="list-disc list-inside">
              {user.interests.map((interest, i) => {
                return <span key={i}>{interest} </span>;
              })}
            </ul>
          )}
        {user.interests &&
          user.interests.filter((interest) => interest !== "").length === 0 && (
            <p className="text-gray-600">
              No interests have been set yet. Add some interests to let people
              know more about you.
            </p>
          )}
      </div>
      {user.totalPosts !== undefined && (
        <div className="mb-4">
          {user.totalPosts === 0 ? (
            <span>
              You haven't created any posts in any communities yet. You're a
              member of {user.totalCommunities} communit
              {user.totalCommunities === 1 ? "y" : "ies"} since joining on{" "}
              {new Date(user.createdAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          ) : (
            <span>
              In {user.duration}, You've created {user.totalPosts}{" "}
              {user.totalPosts === 1 ? "post" : "posts"} across{" "}
              {user.totalPostCommunities}{" "}
              {user.totalPostCommunities === 1 ? "community" : "communities"}{" "}
              since joining on{" "}
              {new Date(user.createdAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              {user.totalCommunities === 0 ? (
                <span>
                  . Currently you are not a member of any communities.
                </span>
              ) : (
                <span>
                  . You're a member of {user.totalCommunities} communit
                  {user.totalCommunities === 1 ? "y" : "ies"}!
                </span>
              )}
            </span>
          )}
        </div>
      )}

      <div>
        <h3 className="text-lg font-bold mb-4">Your posts</h3>

        {posttoShow && posttoShow.length === 0 && (
          <p className="text-gray-600">No posts available.</p>
        )}
        {posttoShow}
      </div>
    </div>
  );
};

export default UserProfile;
