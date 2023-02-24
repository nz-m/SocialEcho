//userData : {id: 'd8daff4ab66', name: 'Name', email: 'name@gmail.com', role: 'general'}


const initialState = {
  userData: null,
  refreshToken: null,
  accessToken: null,
};

const SIGNUP = "SIGNUP";
const SIGNIN = "SIGNIN";
const LOGOUT = "LOGOUT";

const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
const REFRESH_TOKEN_FAIL = "REFRESH_TOKEN_FAIL";

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, authData: action?.data };
    case SIGNIN:
      localStorage.setItem("profile", JSON.stringify(action?.data));
      return {
        ...state,
        userData: action?.data.user,
        accessToken: action?.data?.accessToken,
        refreshToken: action?.data?.refreshToken,
      };
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
      profile.refreshToken = action?.payload?.refreshToken;
      profile.accessToken = action?.payload?.accessToken;
      profile.accessTokenUpdatedAt = action?.payload?.accessTokenUpdatedAt;
      localStorage.setItem("profile", JSON.stringify(profile));
      return {
        ...state,
        refreshToken: action?.payload?.refreshToken,
        accessToken: action?.payload?.accessToken,
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
