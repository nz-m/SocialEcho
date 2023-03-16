// export default moderationReducer;
import { GET_MOD_PROFILE } from "../actions/authActions";
import {
  GET_COMMUNITY_MEMBERS,
  GET_COMMUNITY_MODS,
} from "../actions/communityActions";
const SET_MODERATOR = "SET_MODERATOR";
const initialState = {
  isModerator: false,
  modProfile: null,
  communityMembers: [],
  communityMods: [],
  bannedUsers: [],
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

    case GET_COMMUNITY_MEMBERS:
      return {
        ...state,
        communityMembers: payload.members,
        bannedUsers: payload.bannedUsers,
      };
    case GET_COMMUNITY_MODS:
      return {
        ...state,
        communityMods: payload,
      };

    default:
      return state;
  }
};

export default moderationReducer;
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
