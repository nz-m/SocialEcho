const initialState = {
  isModerator: false,
};

const moderationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_MODERATOR":
      return {
        ...state,
        isModerator: payload,
      };
    default:
      return state;
  }
};

export default moderationReducer;
