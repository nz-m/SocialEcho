import * as types from "../constants/authConstants";
import {
  GET_COMMUNITY_SUCCESS,
  GET_COMMUNITY_FAIL,
} from "../constants/communityConstants";

const initialState = {
  userData: null,
  refreshToken: null,
  accessToken: null,
  signUperror: [],
  signInerror: null,
  successMessage: null,
  isModerator: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        successMessage: payload || null,
      };

    case types.SIGNUP_FAIL:
      return {
        ...state,
        signUperror: payload || [],
      };

    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        userData: payload?.user,
        accessToken: payload?.accessToken,
        refreshToken: payload?.refreshToken,
        successMessage: payload || null,
      };

    case types.SIGNIN_FAIL:
      return {
        ...state,
        signInerror: payload,
      };

    case types.LOGOUT:
      return {
        ...state,
        userData: null,
        refreshToken: null,
        accessToken: null,
        signInerror: null,
        signUperror: [],
        successMessage: null,
        isModerator: false,
      };

    case types.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: payload?.accessToken,
        refreshToken: payload?.refreshToken,
      };

    case types.REFRESH_TOKEN_FAIL:
      return {
        ...state,
        userData: null,
        refreshToken: null,
        accessToken: null,
        signUperror: [],
        signInerror: null,
        successMessage: null,
        isModerator: false,
      };

    case GET_COMMUNITY_SUCCESS:
      const moderators = payload?.moderators || [];
      const isModerator = moderators.some(
        (moderator) => moderator === state.userData?._id
      );
      return {
        ...state,
        isModerator,
      };

    case GET_COMMUNITY_FAIL:
      return {
        ...state,
        isModerator: false,
      };

    default:
      return state;
  }
};

export default authReducer;
