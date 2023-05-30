import * as api from "../api/adminAPI";
import * as types from "../constants/adminConstants";

export const getCommunitiesAction = () => async (dispatch) => {
  try {
    const { error, data } = await api.getCommunities();
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.GET_COMMUNITIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_COMMUNITIES_FAIL,
      payload: error.message,
    });
  }
};

export const getCommunityAction = (communityId) => async (dispatch) => {
  try {
    const { error, data } = await api.getCommunity(communityId);
    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.GET_COMMUNITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_COMMUNITY_FAIL,
      payload: error.message,
    });
  }
};

export const getModeratorsAction = () => async (dispatch) => {
  try {
    const { error, data } = await api.getModerators();
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.GET_MODERATORS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_MODERATORS_FAIL,
      payload: error.message,
    });
  }
};

export const addModeratorAction =
  (communityId, moderatorId) => async (dispatch) => {
    try {
      const { error } = await api.addModerator(communityId, moderatorId);
      if (error) {
        throw new Error(error);
      }
      dispatch({
        type: types.ADD_MODERATOR_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: types.ADD_MODERATOR_FAIL,
        payload: error.message,
      });
    }
  };

export const removeModeratorAction =
  (communityId, moderatorId) => async (dispatch) => {
    try {
      const { error } = await api.removeModerator(communityId, moderatorId);
      if (error) {
        throw new Error(error);
      }
      dispatch({
        type: types.REMOVE_MODERATOR_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: types.REMOVE_MODERATOR_FAIL,
        payload: error.message,
      });
    }
  };
