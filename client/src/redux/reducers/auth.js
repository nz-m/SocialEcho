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

/* ********************************* */
// import {
//   SIGNUP_REQUEST,
//   SIGNUP_SUCCESS,
//   SIGNUP_FAILURE,
//   SIGNIN_REQUEST,
//   SIGNIN_SUCCESS,
//   SIGNIN_FAILURE,
//   LOGOUT_REQUEST,
//   LOGOUT_SUCCESS,
//   LOGOUT_FAILURE,
//   REFRESH_TOKEN_SUCCESS,
//   REFRESH_TOKEN_FAILURE,
//   GET_MOD_PROFILE_REQUEST,
//   GET_MOD_PROFILE_SUCCESS,
//   GET_MOD_PROFILE_FAILURE,
// } from "../actions/authActionsUpdate";
// import { GET_COMMUNITY } from "../actions/communityActions";

// const initialState = {
//   userData: null,
//   refreshToken: null,
//   accessToken: null,
//   isModerator: false,
//   errors: [],
//   isLoading: false,
//   isError: false,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SIGNUP_REQUEST:
//       return {
//         ...state,
//         isLoading: true,
//         isError: false,
//       };

//     case SIGNUP_SUCCESS:
//       return {
//         ...state,
//         userData: action.payload?.data,
//         refreshToken: action.payload?.refreshToken,
//         accessToken: action.payload?.accessToken,
//         signupErr: action.payload?.errors || [],
//         isLoading: false,
//         isError: false,
//       };

//     case SIGNUP_FAILURE:
//       return {
//         ...state,
//         errors: action.payload?.errors || [],
//         isLoading: false,
//         isError: true,
//       };

//     case SIGNIN_REQUEST:
//       return {
//         ...state,
//         isLoading: true,
//         isError: false,
//       };

//     case SIGNIN_SUCCESS:
//       return {
//         ...state,
//         userData: action.payload.user,
//         accessToken: action.payload.accessToken,
//         refreshToken: action.payload.refreshToken,
//         isLoading: false,
//         isError: false,
//       };

//     case SIGNIN_FAILURE:
//       return {
//         ...state,
//         errors: action.payload?.errors || [],
//         isLoading: false,
//         isError: true,
//       };

//     case LOGOUT_REQUEST:
//       return {
//         ...state,
//         isLoading: true,
//         isError: false,
//       };

//     case LOGOUT_SUCCESS:
//       return {
//         ...state,
//         userData: null,
//         accessToken: null,
//         refreshToken: null,
//         isLoading: false,
//         isError: false,
//       };

//     case LOGOUT_FAILURE:
//       return {
//         ...state,
//         errors: action.payload?.errors || [],
//         isLoading: false,
//         isError: true,
//       };

//     case REFRESH_TOKEN_SUCCESS:
//       return {
//         ...state,
//         accessToken: action.payload.accessToken,
//         refreshToken: action.payload.refreshToken,
//       };

//     case REFRESH_TOKEN_FAILURE:
//       return {
//         ...state,
//         userData: null,
//         accessToken: null,
//         refreshToken: null,
//       };

//     case GET_MOD_PROFILE_REQUEST:
//       return {
//         ...state,
//         isLoading: true,
//         isError: false,
//       };

//     case GET_MOD_PROFILE_SUCCESS:
//       return {
//         ...state,
//         userData: action.payload?.data,
//         isLoading: false,
//         isError: false,
//       };

//     case GET_MOD_PROFILE_FAILURE:
//       return {
//         ...state,
//         errors: action.payload?.errors || [],
//         isLoading: false,
//         isError: true,
//       };

//     case GET_COMMUNITY:
//       const moderators = action.payload?.moderators || [];
//       const isModerator = moderators.some(
//         (moderator) => moderator === state.userData?._id
//       );
//       return {
//         ...state,
//         isModerator,
//       };

//     default:
//       return state;
//   }
// };

// export default authReducer;
