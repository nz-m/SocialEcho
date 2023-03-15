import {
  GET_COMMUNITY,
  GET_JOINED_COMMUNITIES,
  GET_NOT_JOINED_COMMUNITIES,
  JOIN_COMMUNITY,
  LEAVE_COMMUNITY,
  REPORT_POST,
  GET_REPORTED_POSTS,
  DELETE_REPORTED_POST,
} from "../actions/communityActions";

const initialState = {
  communityData: null,
  joinedCommunities: [],
  notJoinedCommunities: [],
  reportedPosts: [],
};

const communityReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COMMUNITY:
      return {
        ...state,
        communityData: payload || null,
      };
    case GET_JOINED_COMMUNITIES:
      return {
        ...state,
        joinedCommunities: payload || [],
      };
    case GET_NOT_JOINED_COMMUNITIES:
      return {
        ...state,
        notJoinedCommunities: payload || [],
      };
    case JOIN_COMMUNITY:
      return {
        ...state,
        joinedCommunities: [...state.joinedCommunities, payload],
        notJoinedCommunities: state.notJoinedCommunities.filter(
          (community) => community.name !== payload.name
        ),
      };
    case LEAVE_COMMUNITY:
      return {
        ...state,
        joinedCommunities: state.joinedCommunities.filter(
          (community) => community.name !== payload.name
        ),
        notJoinedCommunities: [...state.notJoinedCommunities, payload],
      };

    case REPORT_POST:
      return {
        ...state,
        communityData: {
          ...state.communityData,
          reportedPosts: [...state.communityData.reportedPosts, payload],
        },
      };
    case GET_REPORTED_POSTS:
      return {
        ...state,
        reportedPosts: payload || [],
      };
    case DELETE_REPORTED_POST:
      return {
        ...state,
        reportedPosts: state.reportedPosts.filter(
          (post) => post._id !== payload
        ),
      };

    default:
      return state;
  }
};

export default communityReducer;
