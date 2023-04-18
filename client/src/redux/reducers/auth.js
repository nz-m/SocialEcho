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
  contextAuthData: null,
  trustedAuthContextData: [],
  blockedAuthContextData: [],
  userPreferences: null,
  contextAuthError: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        signInerror: null,
        signUperror: [],
        successMessage: payload ? payload : null,
      };

    case types.SIGNUP_FAIL:
      return {
        ...state,
        successMessage: null,
        signInerror: null,
        signUperror: payload ? payload : [],
      };

    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        userData: payload ? payload.user : null,
        accessToken: payload ? payload.accessToken : null,
        refreshToken: payload ? payload.refreshToken : null,
        signInerror: null,
        successMessage: payload ? payload : null,
      };

    case types.SIGNIN_FAIL:
      return {
        ...state,
        successMessage: null,
        signUperror: [],
        signInerror: payload ? payload : null,
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
        accessToken: payload ? payload.accessToken : null,
        refreshToken: payload ? payload.refreshToken : null,
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
      const moderators = payload ? payload.moderators : [];
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

    case types.GET_CONTEXT_AUTH_DATA_SUCCESS:
      return {
        ...state,
        contextAuthData: payload ? payload : null,
        contextAuthError: null,
      };

    case types.GET_CONTEXT_AUTH_DATA_FAIL:
      return {
        ...state,
        contextAuthData: null,
        contextAuthError: payload ? payload : null,
      };

    case types.GET_TRUSTED_AUTH_CONTEXT_DATA_SUCCESS:
      return {
        ...state,
        trustedAuthContextData: payload ? payload : [],
        contextAuthError: null,
      };

    case types.GET_TRUSTED_AUTH_CONTEXT_DATA_FAIL:
      return {
        ...state,
        trustedAuthContextData: [],
        contextAuthError: payload ? payload : null,
      };

    case types.GET_USER_PREFERENCES_SUCCESS:
      return {
        ...state,
        userPreferences: payload ? payload : null,
        contextAuthError: null,
      };

    case types.GET_USER_PREFERENCES_FAIL:
      return {
        ...state,
        userPreferences: null,
        contextAuthError: payload ? payload : null,
      };

    case types.GET_BLOCKED_AUTH_CONTEXT_DATA_SUCCESS:
      return {
        ...state,
        blockedAuthContextData: payload ? payload : [],
        contextAuthError: null,
      };

    case types.GET_BLOCKED_AUTH_CONTEXT_DATA_FAIL:
      return {
        ...state,
        blockedAuthContextData: [],
        contextAuthError: payload ? payload : null,
      };

    case types.DELETE_CONTEXT_AUTH_DATA_FAIL:
    case types.UNBLOCK_CONTEXT_AUTH_DATA_FAIL:
    case types.BLOCK_CONTEXT_AUTH_DATA_FAIL:
      return {
        ...state,
        contextAuthError: payload ? payload : null,
      };

    default:
      return state;
  }
};

export default authReducer;
