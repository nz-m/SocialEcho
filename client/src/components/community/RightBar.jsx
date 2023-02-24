import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityAction } from "../../actions/communityActions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { leaveFetchData } from "../../middlewares/joinLeaveFetch";

const RightBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { communityName } = useParams();

  useEffect(() => {
    dispatch(getCommunityAction(communityName));
  }, [dispatch, communityName]);

  const communityData = useSelector((state) => state.community.communityData);

  if (!communityData) {
    return null;
    // later add a loading spinner
  }

  const { name, _id, description, posts, members, moderators, image, rules } =
    communityData;
  const leaveCommunityHandler = (communityName) => {
    dispatch(leaveFetchData(communityName));
    navigate("/");
  };

  return (
    <div className="w-1/4 p-4">
      <div className="bg-white rounded-md shadow-md p-4">
        <h2>A banner goes here</h2>
        <h2 className="text-lg font-bold mb-4">{name}</h2>
        <h3>{description}</h3>
        <div className="flex items-center text-gray-500 mb-4">
          <span className="mr-2">{members.length}</span>
          joined members
        </div>
        <div>
          {/*  a community moderation panel link
           */}

          <Link
            to={`/community/${communityName}/moderator`}
            className="text-blue-500"
          >
            Community Settings (available to moderators only)
          </Link>

          {/* leave button */}
          <button
            onClick={() => {
              leaveCommunityHandler(communityName);
            }}
            className="btn btn-primary btn-sm ms-2"
          >
            Leave
          </button>
        </div>

        <div className="text-gray-500 mb-4">
          <span className="font-bold">Moderators:</span>{" "}
          {moderators.map((moderator) => moderator.name).join(", ")}
        </div>
        <div className="text-gray-500 mb-4">
          <span className="font-bold">Community Guidelines:</span>

          <ul className="list-disc list-inside">
            {rules.map((rule) => (
              <li key={rule._id}>{rule.rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
