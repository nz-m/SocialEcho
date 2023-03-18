import {
  GET_USER,
  GET_PUBLIC_USERS,
  GET_PUBLIC_USER_PROFILE,
  CHANGE_FOLLOW_STATUS,
} from "../actions/userActions";

const initialState = {
  user: {},
  publicUsers: [],
  publicUserProfile: {},
  isFollowing: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case GET_PUBLIC_USERS:
      return { ...state, publicUsers: action.payload };

    case GET_PUBLIC_USER_PROFILE:
      return { ...state, publicUserProfile: action.payload };
    case CHANGE_FOLLOW_STATUS:
      return { ...state, isFollowing: action.data.isFollowing };

    default:
      return state;
  }
};

export default user;
