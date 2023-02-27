import * as api from "../api/communityAPI";

export const GET_COMMUNITY = "GET_COMMUNITY";
export const GET_JOINED_COMMUNITIES = "GET_JOINED_COMMUNITIES";
export const GET_NOT_JOINED_COMMUNITIES = "GET_NOT_JOINED_COMMUNITIES";
export const JOIN_COMMUNITY = "JOIN_COMMUNITY";
export const LEAVE_COMMUNITY = "LEAVE_COMMUNITY";

export const getCommunityAction = (communityName) => async (dispatch) => {
  try {
    const { data } = await api.getCommunity(communityName);
    dispatch({
      type: GET_COMMUNITY,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJoinedCommunitiesAction = (callback) => async (dispatch) => {
  try {
    const { data } = await api.getJoinedCommunities();
    dispatch({
      type: GET_JOINED_COMMUNITIES,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });

    if (callback) {
      callback();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getNotJoinedCommunitiesAction = (callback) => async (dispatch) => {
  try {
    const { data } = await api.getNotJoinedCommunities();
    dispatch({
      type: GET_NOT_JOINED_COMMUNITIES,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });

    if (callback) {
      callback();
    }
  } catch (error) {
    console.log(error);
  }
};

export const joinCommunityAction =
  (communityName, callback) => async (dispatch) => {
    try {
      const { data } = await api.joinCommunity(communityName);
      dispatch({
        type: JOIN_COMMUNITY,
        payload: data,
        meta: {
          requiresAuth: true,
        },
      });
      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  };

export const leaveCommunityAction = (communityName) => async (dispatch) => {
  try {
    const { data } = await api.leaveCommunity(communityName);
    dispatch({
      type: LEAVE_COMMUNITY,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
