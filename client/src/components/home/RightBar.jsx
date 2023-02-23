import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getNotJoinedCommunitiesAction,
  joinCommunityAction,
  getJoinedCommunitiesAction,
} from "../../actions/communityActions";

const RightBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotJoinedCommunitiesAction());
  }, [dispatch]);

  const notJoinedCommunities = useSelector(
    (state) => state.community.notJoinedCommunities
  );

  if (!notJoinedCommunities) {
    return null;
    // later add a loading spinner
  }

  const joinCommumityHandler = (communityName) => {
    dispatch(joinCommunityAction(communityName));
    dispatch(getNotJoinedCommunitiesAction());
    dispatch(getJoinedCommunitiesAction());
  };

  return (
    <div className="w-1/4 h-screen bg-gray-100">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">Suggested Communities</h5>
          <ul className="list-group">
            {notJoinedCommunities.map((community) => (
              <li
                key={community._id}
                className="list-group-item d-flex align-items-center"
              >
                <img
                  src="https://via.placeholder.com/50"
                  className="rounded-circle me-2"
                  alt="User Avatar"
                />
                <span>{community.name}</span>
                <button
                  onClick={() => {
                    joinCommumityHandler(community.name);
                  }}
                  className="btn btn-primary btn-sm ms-2"
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title mb-3">People to Follow</h5>
          <ul className="list-group">
            <li className="list-group-item d-flex align-items-center">
              <img
                src="https://via.placeholder.com/50"
                className="rounded-circle me-2"
                alt="User Avatar"
              />
              <span>John Doe</span>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <img
                src="https://via.placeholder.com/50"
                className="rounded-circle me-2"
                alt="User Avatar"
              />
              <span>Jane Doe</span>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <img
                src="https://via.placeholder.com/50"
                className="rounded-circle me-2"
                alt="User Avatar"
              />
              <span>Bob Smith</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
