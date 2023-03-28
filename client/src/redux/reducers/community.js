import * as types from "../constants/communityConstants";

const initialState = {
  communityData: null,
  joinedCommunities: [],
  notJoinedCommunities: [],
  reportedPosts: [],
  communityError: null,
};

const communityReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_COMMUNITY_SUCCESS:
      return {
        ...state,
        communityData: payload ? payload : null,
        communityError: null,
      };
    case types.GET_COMMUNITY_FAIL:
      return {
        ...state,
        communityError: payload,
      };

    case types.GET_JOINED_COMMUNITIES_SUCCESS:
      return {
        ...state,
        joinedCommunities: payload ? payload : [],
        communityError: null,
      };
    case types.GET_JOINED_COMMUNITIES_FAIL:
      return {
        ...state,
        communityError: payload,
      };

    case types.GET_NOT_JOINED_COMMUNITIES_SUCCESS:
      return {
        ...state,
        notJoinedCommunities: payload ? payload : [],
        communityError: null,
      };
    case types.GET_NOT_JOINED_COMMUNITIES_FAIL:
      return {
        ...state,
        communityError: payload,
      };

    case types.JOIN_COMMUNITY_SUCCESS:
      return {
        ...state,
        joinedCommunities: [...state.joinedCommunities, payload],
        notJoinedCommunities: state.notJoinedCommunities.filter(
          (community) => community.name !== payload.name
        ),
        communityError: null,
      };
    case types.JOIN_COMMUNITY_FAIL:
      return {
        ...state,
        communityError: payload,
      };

    case types.LEAVE_COMMUNITY_SUCCESS:
      return {
        ...state,
        joinedCommunities: state.joinedCommunities.filter(
          (community) => community.name !== payload.name
        ),
        notJoinedCommunities: [...state.notJoinedCommunities, payload],
        communityError: null,
      };

    case types.LEAVE_COMMUNITY_FAIL:
      return {
        ...state,
        communityError: payload,
      };

    case types.REPORT_POST_SUCCESS:
      return {
        ...state,
        communityData: {
          ...state.communityData,
          reportedPosts: [...state.communityData.reportedPosts, payload],
        },
        communityError: null,
      };
    case types.REPORT_POST_FAIL:
      return {
        ...state,
        communityError: payload,
      };

    case types.GET_REPORTED_POSTS_SUCCESS:
      return {
        ...state,
        reportedPosts: payload ? payload : [],
        communityError: null,
      };

    case types.GET_REPORTED_POSTS_FAIL:
      return {
        ...state,
        communityError: payload,
      };

    case types.DELETE_REPORTED_POST_SUCCESS:
      return {
        ...state,
        reportedPosts: state.reportedPosts.filter(
          (post) => post._id !== payload
        ),
        communityError: null,
      };

    case types.DELETE_REPORTED_POST_FAIL:
      return {
        ...state,
        communityError: payload,
      };

    default:
      return state;
  }
};

export default communityReducer;
