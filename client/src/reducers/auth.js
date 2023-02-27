import {
  SIGNUP,
  SIGNIN,
  LOGOUT,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAIL,
} from "../actions/authActions";

const initialState = {
  userData: null,
  refreshToken: null,
  accessToken: null,
  signupErr: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        userData: action.data.data,
        refreshToken: action.data.refreshToken,
        accessToken: action.data.accessToken,
        signupErr: action.data
      };

    case SIGNIN:
      const { user, accessToken, refreshToken } = action.data;
      localStorage.setItem("profile", JSON.stringify(action.data));
      return { ...state, userData: user, accessToken, refreshToken };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        userData: null,
        accessToken: null,
        refreshToken: null,
      };
    case REFRESH_TOKEN_SUCCESS:
      const profile = JSON.parse(localStorage.getItem("profile"));
      const payload = action.payload;
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...profile, ...payload })
      );
      return {
        ...state,
        refreshToken: payload.refreshToken,
        accessToken: payload.accessToken,
      };

    case REFRESH_TOKEN_FAIL:
      localStorage.clear();
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
