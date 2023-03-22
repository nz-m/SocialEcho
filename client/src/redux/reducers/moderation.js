import * as types from "../constants/communityConstants";
import {
  GET_MOD_PROFILE_SUCCESS,
  GET_MOD_PROFILE_FAIL,
} from "../constants/authConstants";
const SET_MODERATOR = "SET_MODERATOR";
const initialState = {
  isModerator: false,
  modProfile: null,
  communityMembers: [],
  communityMods: [],
  bannedUsers: [],
  modError: null,
};

const moderationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MODERATOR:
      return {
        ...state,
        isModerator: payload,
        modError: null,
      };

    case GET_MOD_PROFILE_SUCCESS:
      return {
        ...state,
        modProfile: payload.moderatorInfo,
        modError: null,
      };

    case GET_MOD_PROFILE_FAIL:
      return {
        ...state,
        isModerator: false,
        modProfile: null,
        communityMembers: [],
        communityMods: [],
        bannedUsers: [],
        modError: payload,
      };

    case types.GET_COMMUNITY_MEMBERS_SUCCESS:
      return {
        ...state,
        communityMembers: payload.members,
        bannedUsers: payload.bannedUsers,
        modError: null,
      };

    case types.GET_COMMUNITY_MEMBERS_FAIL:
      return {
        ...state,
        isModerator: false,
        modProfile: null,
        communityMembers: [],
        communityMods: [],
        bannedUsers: [],
        modError: payload,
      };

    case types.GET_COMMUNITY_MODS_SUCCESS:
      return {
        ...state,
        communityMods: payload,
      };

    case types.GET_COMMUNITY_MODS_FAIL:
      return {
        ...state,
        isModerator: false,
        modProfile: null,
        communityMembers: [],
        communityMods: [],
        bannedUsers: [],
        modError: payload,
      };

    default:
      return state;
  }
};

export default moderationReducer;
