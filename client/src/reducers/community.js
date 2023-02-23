const initialState = {
  communityData: null,
};

const GET_COMMUNITY = "GET_COMMUNITY";

const communityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMUNITY:
      return { ...state, communityData: action?.data };
    default:
      return state;
  }
};

export default communityReducer;
