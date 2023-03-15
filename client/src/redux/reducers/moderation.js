// import {
//   GET_MOD_PROFILE_REQUEST,
//   GET_MOD_PROFILE_SUCCESS,
//   GET_MOD_PROFILE_FAILURE,
// } from "../actions/authActionsUpdate";

// const SET_MODERATOR = "SET_MODERATOR";

// const initialState = {
//   isModerator: false,
//   modProfile: null,
//   isLoading: false,
//   isError: false,
//   errors: [],
// };

// const moderationReducer = (state = initialState, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case SET_MODERATOR:
//       return {
//         ...state,
//         isModerator: payload,
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
//         isLoading: false,
//         modProfile: payload.moderatorInfo,
//       };
//     case GET_MOD_PROFILE_FAILURE:
//       return {
//         ...state,
//         isLoading: false,
//         isError: true,
//         errors: payload,
//       };
//     default:
//       return state;
//   }
// };

// export default moderationReducer;
import { GET_MOD_PROFILE } from "../actions/authActions";
const SET_MODERATOR = "SET_MODERATOR";

const initialState = {
  isModerator: false,
  modProfile: null,
};

const moderationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MODERATOR:
      return {
        ...state,
        isModerator: payload,
      };
    case GET_MOD_PROFILE:
      return {
        ...state,
        modProfile: payload.moderatorInfo,
      };

    default:
      return state;
  }
};

export default moderationReducer;
