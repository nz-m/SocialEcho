import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getNotJoinedCommunitiesAction,
  joinCommunityAction,
  getJoinedCommunitiesAction,
} from "../../redux/actions/communityActions";
import {
  getUserAction,
  getPublicUsersAction,
  followUserAction,
} from "../../redux/actions/userActions";
import {
  getPostsAction,
  getSavedPostsAction,
} from "../../redux/actions/postActions";
import { Link } from "react-router-dom";

const RightBar = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth?.userData);
  const publicUsers = useSelector((state) => state.user.publicUsers);
  useEffect(() => {
    dispatch(getNotJoinedCommunitiesAction());
    dispatch(getPublicUsersAction());
  }, [dispatch]);

  const notJoinedCommunities = useSelector(
    (state) => state.community.notJoinedCommunities
  );

  if (!notJoinedCommunities) {
    return null;
    // later add a loading spinner
  }

  const joinCommumityHandler = (communityName) => {
    const handleJoinedCommunities = () => {
      dispatch(joinCommunityAction(communityName))
        .then(() => dispatch(getJoinedCommunitiesAction()))
        .then(() => dispatch(getNotJoinedCommunitiesAction()))
        .then(() => {
          if (userData) {
            dispatch(getPostsAction(userData._id));
            dispatch(getUserAction(userData._id));
            dispatch(getSavedPostsAction());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    handleJoinedCommunities();
  };

  const followUserHandler = (toFollowId) => {
    dispatch(followUserAction(toFollowId))
      .then(() => dispatch(getPublicUsersAction()))
      .then(() => {
        if (userData) {
          dispatch(getPostsAction(userData._id));
          dispatch(getUserAction(userData._id));
          dispatch(getSavedPostsAction());
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-3/12 h-screen bg-white sticky top-0">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">Suggested Communities</h5>
          {notJoinedCommunities?.length === 0 && (
            <div className="text-center italic text-gray-400">
              No communities to join. Check back later
            </div>
          )}
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
          <h5 className="card-title mb-3">Follow People</h5>
          {publicUsers?.length === 0 && (
            <div className="text-center italic text-gray-400">
              No users to follow. Check back later
            </div>
          )}
          <ul className="list-group">
            {publicUsers &&
              publicUsers.map((user) => (
                <li
                  key={user._id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full mr-4"
                      src={user.avatar}
                      alt={user.name}
                    />
                    <div>
                      <Link to={`/user/${user._id}`} className="font-medium">
                        {user.name}
                      </Link>
                      <div className="text-gray-500 text-sm">
                        {user.location}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => followUserHandler(user._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Follow
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
