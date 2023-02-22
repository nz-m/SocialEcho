const initialState = { authData: null, loading: true, errors: null };
const SIGNUP = "SIGNUP";
const SIGNIN = "SIGNIN";
const LOGOUT = "LOGOUT";

const AUTH_ERROR = "AUTH_ERROR";

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      //   localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data, loading: false, errors: null };

    case SIGNIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    case AUTH_ERROR:
      return { ...state, loading: false, errors: action?.data };
    default:
      return state;
  }
};

export default authReducer;
