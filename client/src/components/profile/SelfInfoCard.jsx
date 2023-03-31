import React from "react";

const SelfInfoCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {user.totalPosts === 0 ? (
        <p className="text-gray-600">
          You haven't created any posts in any communities yet. You're a member
          of {user.totalCommunities} communit
          {user.totalCommunities === 1 ? "y" : "ies"} since joining on{" "}
          <span className="font-medium">
            {new Date(user.createdAt).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </p>
      ) : (
        <p className="text-gray-600">
          In <span className="font-medium">{user.duration}</span>, you've
          created <span className="font-medium">{user.totalPosts}</span>{" "}
          {user.totalPosts === 1 ? "post" : "posts"} across{" "}
          <span className="font-medium">{user.totalPostCommunities}</span>{" "}
          {user.totalPostCommunities === 1 ? "community" : "communities"} since
          joining on{" "}
          <span className="font-medium">
            {new Date(user.createdAt).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          {user.totalCommunities === 0 ? (
            <span>. Currently you are not a member of any communities.</span>
          ) : (
            <span>
              . You're a member of{" "}
              <span className="font-medium">
                {user.totalCommunities}{" "}
                {user.totalCommunities === 1 ? "community" : "communities"}
              </span>
              !
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default SelfInfoCard;
