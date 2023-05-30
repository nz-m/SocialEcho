import * as types from "../constants/adminConstants";

const initialState = {
  communities: null,
  community: null,
  moderators: null,
  adminPanelError: null,
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_COMMUNITIES_SUCCESS:
      return {
        ...state,
        communities: payload ? payload : null,
        adminPanelError: null,
      };

    case types.GET_COMMUNITIES_FAIL:
      return {
        ...state,
        communities: null,
        adminPanelError: payload ? payload : null,
      };

    case types.GET_COMMUNITY_SUCCESS:
      return {
        ...state,
        community: payload ? payload : null,
        adminPanelError: null,
      };
    case types.GET_COMMUNITY_FAIL:
      return {
        ...state,
        community: null,
        adminPanelError: payload ? payload : null,
      };

    case types.GET_MODERATORS_SUCCESS:
      return {
        ...state,
        moderators: payload ? payload : null,
        adminPanelError: null,
      };
    case types.GET_MODERATORS_FAIL:
      return {
        ...state,
        moderators: null,
        adminPanelError: payload ? payload : null,
      };
    case types.ADD_MODERATOR_SUCCESS:
      return {
        ...state,
        adminPanelError: null,
      };
    case types.ADD_MODERATOR_FAIL:
      return {
        ...state,
        adminPanelError: payload ? payload : null,
      };
    case types.REMOVE_MODERATOR_SUCCESS:
      return {
        ...state,
        adminPanelError: null,
      };
    case types.REMOVE_MODERATOR_FAIL:
      return {
        ...state,
        adminPanelError: payload ? payload : null,
      };
    default:
      return state;
  }
};

export default adminReducer;
