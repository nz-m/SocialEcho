const initialState = {
  posts: [],
  communityPosts: [],
};

const CREATE_POST = "CREATE_POST";
const GET_POSTS = "GET_POSTS";
const GET_COMMUNITY_POSTS = "GET_COMMUNITY_POSTS";

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
        posts: action.payload || [],
      };
    case GET_COMMUNITY_POSTS:
      return {
        ...state,
        communityPosts: action.payload || [],
      };

    default:
      return state;
  }
};

export default postReducer;
