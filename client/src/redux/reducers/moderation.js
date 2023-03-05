import { GET_MOD_PROFILE } from "../actions/authActions";

const initialState = {
  isModerator: false,
  modProfile: null,
};

const moderationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_MODERATOR":
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
