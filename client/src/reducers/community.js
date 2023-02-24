// communityData : {_id: '614f07ec51a4c7',
// name: 'Technology', description: 'A community for discussing technology and gadgets', ......}

const initialState = {
  communityData: null,
  joinedCommunities: [],
  notJoinedCommunities: [],
};

const GET_COMMUNITY = "GET_COMMUNITY";
const GET_JOINED_COMMUNITIES = "GET_JOINED_COMMUNITIES";
const GET_NOT_JOINED_COMMUNITIES = "GET_NOT_JOINED_COMMUNITIES";
const JOIN_COMMUNITY = "JOIN_COMMUNITY";
const LEAVE_COMMUNITY = "LEAVE_COMMUNITY";

const communityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMUNITY:
      return {
        ...state,
        communityData: action.payload || null,
      };
    case GET_JOINED_COMMUNITIES:
      return {
        ...state,
        joinedCommunities: action.payload || [],
      };
    case GET_NOT_JOINED_COMMUNITIES:
      return {
        ...state,
        notJoinedCommunities: action.payload || [],
      };
    case JOIN_COMMUNITY:
      return {
        ...state,
        joinedCommunities: [...state.joinedCommunities, action.payload],
        notJoinedCommunities: state.notJoinedCommunities.filter(
          (community) => community.name !== action.payload.name
        ),
      };
    case LEAVE_COMMUNITY:
      return {
        ...state,
        joinedCommunities: state.joinedCommunities.filter(
          (community) => community.name !== action.payload.name
        ),
        notJoinedCommunities: [...state.notJoinedCommunities, action.payload],
      };

    default:
      return state;
  }
};

export default communityReducer;
