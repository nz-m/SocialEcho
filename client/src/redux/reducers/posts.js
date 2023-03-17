import {
  CREATE_POST,
  GET_POSTS,
  GET_COMMUNITY_POSTS,
  DELETE_POST,
  UPDATE_POST,
  LIKE_POST,
  UNLIKE_POST,
  GET_COMMENTS,
  DELETE_COMMENT,
  SAVE_POST,
  UNSAVE_POST,
  GET_SAVED_POSTS,
} from "../actions/postActions";

const initialState = {
  posts: [],
  communityPosts: [],
  comments: [],
  savedPosts: [],
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case GET_POSTS:
      if (payload.page === 1) {
        // If it's the first page, replace existing posts
        return {
          ...state,
          posts: payload.posts || [],
        };
      } else {
        // If it's not the first page, append new posts to existing posts
        return {
          ...state,
          posts: [...state.posts, ...(payload.posts || [])],
        };
      }
    case GET_COMMUNITY_POSTS:
      if (payload.page === 1) {
        return {
          ...state,
          communityPosts: payload.posts || [],
        };
      } else {
        return {
          ...state,
          communityPosts: [...state.communityPosts, ...(payload.posts || [])],
        };
      }

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        communityPosts: state.communityPosts.filter(
          (post) => post._id !== payload
        ),
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
        communityPosts: state.communityPosts.map((post) =>
          post._id === payload._id ? payload : post
        ),
      };
    case LIKE_POST:
    case UNLIKE_POST:
      const { posts, communityPosts } = updatePostLike(state, payload);
      return {
        ...state,
        posts,
        communityPosts,
      };

    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
      };
    case DELETE_COMMENT:
      const { postsUpdateD, communityPostsUpdateD } = updateComment(
        state,
        payload
      );
      return {
        ...state,
        comments: state.comments.filter((comment) => comment._id !== payload),
        posts: postsUpdateD,
        communityPosts: communityPostsUpdateD,
      };
    case SAVE_POST:
    case UNSAVE_POST:
    case GET_SAVED_POSTS:
      return {
        ...state,
        savedPosts: payload || [],
      };

    default:
      return state;
  }
};

const updatePostLike = (state, updatedPost) => {
  const posts = state.posts.map((post) =>
    post._id === updatedPost._id ? updatedPost : post
  );
  const communityPosts = state.communityPosts.map((post) =>
    post._id === updatedPost._id ? updatedPost : post
  );
  return { posts, communityPosts };
};

const updateComment = (state, updatedComment) => {
  const postsUpdate = state.posts.map((post) =>
    post._id === updatedComment.post
      ? { ...post, comments: [...post.comments, updatedComment] }
      : post
  );
  const communityPostsUpdate = state.communityPosts.map((post) =>
    post._id === updatedComment.post
      ? { ...post, comments: [...post.comments, updatedComment] }
      : post
  );
  return { postsUpdate, communityPostsUpdate };
};
export default postReducer;
