import {
  GET_USER,
  GET_PUBLIC_USERS,
  GET_PUBLIC_USER_PROFILE,
} from "../actions/userActions";

const initialState = {
  user: {},
  publicUsers: [],
  publicUserProfile: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case GET_PUBLIC_USERS:
      return { ...state, publicUsers: action.payload };

    case GET_PUBLIC_USER_PROFILE:
      return { ...state, publicUserProfile: action.payload };
    default:
      return state;
  }
};

export default user;
