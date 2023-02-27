import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getNotJoinedCommunitiesAction,
  joinCommunityAction,
  getJoinedCommunitiesAction,
} from "../../actions/communityActions";
import { getPostsAction } from "../../actions/postActions";

const RightBar = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth?.userData);

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
    dispatch(
      joinCommunityAction(communityName, () => {
        dispatch(
          getJoinedCommunitiesAction(() => {
            dispatch(
              getNotJoinedCommunitiesAction(() => {
                if (userData) dispatch(getPostsAction(userData.id));
              })
            );
          })
        );
      })
    );
  };
  return (
    <div className="w-3/12 h-screen bg-white sticky top-0">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">Suggested Communities</h5>
          <ul className="list-group">
            {notJoinedCommunities?.map((community) => (
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
