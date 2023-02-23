import * as api from "../api/communityAPI";

export const getCommunityAction = (communityName) => async (dispatch) => {
  try {
    const { data } = await api.getCommunity(communityName);
    dispatch({
      type: "GET_COMMUNITY",
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJoinedCommunitiesAction = () => async (dispatch) => {
  try {
    const { data } = await api.getJoinedCommunities();
    dispatch({
      type: "GET_JOINED_COMMUNITIES",
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getNotJoinedCommunitiesAction = () => async (dispatch) => {
  try {
    const { data } = await api.getNotJoinedCommunities();
    dispatch({
      type: "GET_NOT_JOINED_COMMUNITIES",
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const joinCommunityAction = (communityName) => async (dispatch) => {
  try {
    const { data } = await api.joinCommunity(communityName);
    dispatch({
      type: "JOIN_COMMUNITY",
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const leaveCommunityAction = (communityName) => async (dispatch) => {
  try {
    const { data } = await api.leaveCommunity(communityName);
    dispatch({
      type: "LEAVE_COMMUNITY",
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
