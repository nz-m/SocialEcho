import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  LOGOUT,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAIL,
} from "../actions/authActions";
import { GET_COMMUNITY } from "../actions/communityActions";

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
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        successMessage: action.payload || null,
      };

    case SIGNUP_FAILED:
      return {
        ...state,
        signUperror: action.payload || [],
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        userData: action.payload?.user,
        accessToken: action.payload?.accessToken,
        refreshToken: action.payload?.refreshToken,
        successMessage: action.payload || null,
      };

    case SIGNIN_FAILED:
      return {
        ...state,
        signInerror: action.payload,
      };

    case LOGOUT:
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

    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };

    case REFRESH_TOKEN_FAIL:
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

    case GET_COMMUNITY:
      const moderators = action.payload?.moderators || [];
      const isModerator = moderators.some(
        (moderator) => moderator === state.userData?._id
      );
      return {
        ...state,
        isModerator,
      };

    default:
      return state;
  }
};

export default authReducer;
