import * as types from "../constants/communityConstants";
import { LOGOUT } from "../constants/authConstants";

import {
  GET_MOD_PROFILE_SUCCESS,
  GET_MOD_PROFILE_FAIL,
} from "../constants/authConstants";
const initialState = {
  modProfile: null,
  communityMembers: [],
  communityMods: [],
  bannedUsers: [],
  modError: null,
};

const moderationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGOUT:
      return {
        ...state,
        modProfile: null,
        communityMembers: [],
        communityMods: [],
        bannedUsers: [],
        modError: null,
      };

    case GET_MOD_PROFILE_SUCCESS:
      return {
        ...state,
        modProfile: payload ? payload.moderatorInfo : null,
        modError: null,
      };

    case GET_MOD_PROFILE_FAIL:
      return {
        ...state,

        modProfile: null,
        communityMembers: [],
        communityMods: [],
        bannedUsers: [],
        modError: payload,
      };

    case types.GET_COMMUNITY_MEMBERS_SUCCESS:
      return {
        ...state,
        communityMembers: payload ? payload.members : [],
        bannedUsers: payload ? payload.bannedUsers : [],
        modError: null,
      };

    case types.GET_COMMUNITY_MEMBERS_FAIL:
      return {
        ...state,

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
