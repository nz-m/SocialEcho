import { GET_USER } from "../actions/userActions";

const initialState = {
  user: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default user;
