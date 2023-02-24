const initialState = {
  posts: [],
};

const CREATE_POST = "CREATE_POST";
const GET_POSTS = "GET_POSTS";

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload || [], // check if action.payload is undefined and initialize to empty array
      };

    default:
      return state;
  }
};

export default postReducer;
