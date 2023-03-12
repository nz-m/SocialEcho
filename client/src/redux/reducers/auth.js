import {
  SIGNUP,
  SIGNIN,
  LOGOUT,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAIL,
} from "../actions/authActions";
import { GET_COMMUNITY } from "../actions/communityActions";

const initialState = {
  userData: null,
  refreshToken: null,
  accessToken: null,
  signupErr: [],
  isModerator: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        userData: action.data?.data,
        refreshToken: action.data?.refreshToken,
        accessToken: action.data?.accessToken,
        signupErr: action.data?.errors || [],
      };

    case SIGNIN:
      return {
        ...state,
        userData: action.data.user,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      };

    case LOGOUT:
      return {
        ...state,
        userData: null,
        accessToken: null,
        refreshToken: null,
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
        accessToken: null,
        refreshToken: null,
      };

    case GET_COMMUNITY:
      const moderators = action.payload?.moderators || [];
      const isModerator = moderators.some(
        (moderator) => moderator === state.userData?.id
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
