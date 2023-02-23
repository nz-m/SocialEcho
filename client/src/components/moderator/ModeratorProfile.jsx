import React from "react";

const ModeratorProfile = ({ name, email, password, role, joinedDate }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
      <p className="mt-2 text-gray-600">{email}</p>
      <p className="mt-2 text-gray-600">{password}</p>
      <p className="mt-2 text-gray-600">{role}</p>
      <p className="mt-2 text-gray-600">{`Joined on ${joinedDate}`}</p>
    </div>
  );
};

export default ModeratorProfile;
