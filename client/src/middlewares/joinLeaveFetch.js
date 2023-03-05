// REPLACED BY CALLBACKS IN ACTIONS

import {
  getNotJoinedCommunitiesAction,
  joinCommunityAction,
  getJoinedCommunitiesAction,
  leaveCommunityAction,
} from "../redux/actions/communityActions";

// API CALL IN EACH ACTION CREATOR

// thunk function to handle multiple actions
export const joinFetchData = (communityName) => (dispatch) => {
  // dispatch the first action to join the community
  dispatch(joinCommunityAction(communityName));
  setTimeout(() => {
    dispatch(getNotJoinedCommunitiesAction());
  }, 1000); // wait before fetching data

  setTimeout(() => {
    dispatch(getJoinedCommunitiesAction());
  }, 1000); // wait before fetching data
};

export const leaveFetchData = (communityName) => (dispatch) => {
  // dispatch the first action to leave the community
  dispatch(leaveCommunityAction(communityName));
  setTimeout(() => {
    dispatch(getNotJoinedCommunitiesAction());
  }, 1000); // wait before fetching data

  setTimeout(() => {
    dispatch(getJoinedCommunitiesAction());
  }, 1000); // wait before fetching data
};

// /export const joinFetchData = (communityName) => async (dispatch) => {
//   // dispatch the first action to join the community
//   dispatch(joinCommunityAction(communityName));

//   // fetch both not joined and joined communities in parallel using Promise.all
//   const [notJoinedCommunities, joinedCommunities] = await Promise.all([
//     dispatch(getNotJoinedCommunitiesAction()),
//     dispatch(getJoinedCommunitiesAction()),
//   ]);

//   // dispatch final actions with the fetched data
//   dispatch({
//     type: 'SET_NOT_JOINED_COMMUNITIES',
//     notJoinedCommunities,
//   });

//   dispatch({
//     type: 'SET_JOINED_COMMUNITIES',
//     joinedCommunities,
//   });
// };

// export const leaveFetchData = (communityName) => async (dispatch) => {
//   // dispatch the first action to leave the community
//   dispatch(leaveCommunityAction(communityName));

//   // fetch both not joined and joined communities in parallel using Promise.all
//   const [notJoinedCommunities, joinedCommunities] = await Promise.all([
//     dispatch(getNotJoinedCommunitiesAction()),
//     dispatch(getJoinedCommunitiesAction()),
//   ]);

//   // dispatch final actions with the fetched data
//   dispatch({
//     type: 'SET_NOT_JOINED_COMMUNITIES',
//     notJoinedCommunities,
//   });

//   dispatch({
//     type: 'SET_JOINED_COMMUNITIES',
//     joinedCommunities,
//   });
// };
