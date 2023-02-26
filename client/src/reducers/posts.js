const initialState = {
  posts: [],
  communityPosts: [],
};

const CREATE_POST = "CREATE_POST";
const GET_POSTS = "GET_POSTS";
const GET_COMMUNITY_POSTS = "GET_COMMUNITY_POSTS";
const DELETE_POST = "DELETE_POST";
const UPDATE_POST = "UPDATE_POST";

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
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        communityPosts: state.communityPosts.filter(
          (post) => post._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default postReducer;
