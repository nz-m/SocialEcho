import * as types from "../constants/userConstants";
import { LOGOUT } from "../constants/authConstants";

const initialState = {
  user: {},
  publicUsers: [],
  publicUserProfile: {},
  followingUsers: [],
  isFollowing: null,
  userError: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGOUT:
      return {
        ...state,
        user: {},
        publicUsers: [],
        publicUserProfile: {},
        followingUsers: [],
        isFollowing: null,
        userError: null,
      };

    case types.GET_USER_SUCCESS:
      return { ...state, user: payload, userError: null };

    case types.GET_USER_FAIL:
      return { ...state, userError: payload };

    case types.GET_PUBLIC_USERS_SUCCESS:
      return {
        ...state,
        publicUsers: payload || [],
        userError: null,
      };

    case types.GET_PUBLIC_USERS_FAIL:
      return { ...state, userError: payload };

    case types.GET_PUBLIC_USER_PROFILE_SUCCESS:
      return {
        ...state,
        publicUserProfile: payload || {},
        userError: null,
        isFollowing: payload?.isFollowing ?? null,
      };

    case types.GET_PUBLIC_USER_PROFILE_FAIL:
      return { ...state, userError: payload };

    case types.CHANGE_FOLLOW_STATUS_SUCCESS:
      return {
        ...state,
        isFollowing: payload ? payload.isFollowing : null,
        userError: null,
      };

    case types.CHANGE_FOLLOW_STATUS_FAIL:
      return { ...state, userError: payload };

    case types.GET_FOLLOWING_USERS_SUCCESS:
      return { ...state, followingUsers: payload, userError: null };

    case types.GET_FOLLOWING_USERS_FAIL:
      return { ...state, userError: payload };

    default:
      return state;
  }
};

export default userReducer;
