import * as types from "../constants/authConstants";
import {
  GET_COMMUNITY_SUCCESS,
  GET_COMMUNITY_FAIL,
} from "../constants/communityConstants";

const initialState = {
  userData: null,
  refreshToken: null,
  accessToken: null,
  signInError: null,
  signUpError: [],
  successMessage: null,
  isModeratorOfThisCommunity: false,
  contextAuthData: null,
  trustedAuthContextData: [],
  blockedAuthContextData: [],
  userPreferences: null,
  contextAuthError: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload ? payload : null,
      };
    case types.SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: payload ? payload : null,
      };
    case types.SET_USER_DATA:
      return {
        ...state,
        userData: payload ? payload : null,
      };

    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        signInError: null,
        signUpError: [],
        successMessage: payload ? payload : null,
      };

    case types.SIGNUP_FAIL:
      return {
        ...state,
        successMessage: null,
        signInError: null,
        signUpError: payload ? payload : [],
      };

    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        userData: payload ? payload.user : null,
        accessToken: payload ? payload.accessToken : null,
        refreshToken: payload ? payload.refreshToken : null,
        signInError: null,
        successMessage: payload ? payload : null,
      };

    case types.SIGNIN_FAIL:
      return {
        ...state,
        successMessage: null,
        signUpError: [],
        signInError: payload ? payload : null,
      };

    case types.LOGOUT:
      return {
        ...state,
        userData: null,
        refreshToken: null,
        accessToken: null,
        signInError: null,
        signUpError: [],
        successMessage: null,
        isModeratorOfThisCommunity: false,
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
        signUpError: [],
        signInError: null,
        successMessage: null,
        isModeratorOfThisCommunity: false,
      };

    case GET_COMMUNITY_SUCCESS:
      const moderators = payload ? payload.moderators : [];
      const isModeratorOfThisCommunity = moderators.some(
        (moderator) => moderator === state.userData?._id
      );
      return {
        ...state,
        isModeratorOfThisCommunity,
      };

    case GET_COMMUNITY_FAIL:
      return {
        ...state,
        isModeratorOfThisCommunity: false,
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

    case types.CLEAR_MESSAGE:
      return {
        ...state,
        successMessage: null,
        signInError: null,
        signUpError: [],
      };

    default:
      return state;
  }
};

export default authReducer;
