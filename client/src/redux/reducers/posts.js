import * as types from "../constants/postConstants";
import { LOGOUT } from "../constants/authConstants";

const initialState = {
  post: null,
  posts: [],
  publicPosts: [],
  selfPost: null,
  communityPosts: [],
  followingUsersPosts: [],
  savedPosts: [],
  postError: null,
  totalPosts: 0,
  totalCommunityPosts: 0,
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGOUT:
      return {
        ...state,
        post: null,
        posts: [],
        selfPost: null,
        publicPosts: [],
        communityPosts: [],
        followingUsersPosts: [],
        comments: [],
        savedPosts: [],
        postError: null,
      };

    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [payload, ...state.posts],
        communityPosts: [payload, ...state.communityPosts],
        postError: null,
      };

    case types.CREATE_POST_FAIL:
      return {
        ...state,
        postError: payload,
      };

    case types.GET_POST_SUCCESS:
      return {
        ...state,
        post: payload,
        postError: null,
      };
    case types.GET_POST_FAIL:
      return {
        ...state,
        postError: payload,
      };

    case types.GET_SELF_POST_SUCCESS:
      return {
        ...state,
        selfPost: payload,
        postError: null,
      };
    case types.GET_SELF_POST_FAIL:
      return {
        ...state,
        postError: payload,
      };

    case types.CLEAR_POST:
      return {
        ...state,
        post: null,
        comments: [],
      };

    case types.CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        totalPosts: 0,
      };

    case types.CLEAR_COMMUNITY_POSTS:
      return {
        ...state,
        communityPosts: [],
        totalCommunityPosts: 0,
      };

    case types.GET_POSTS_SUCCESS:
      if (payload.page === 1) {
        return {
          ...state,
          posts: payload ? payload.posts : [],
          totalPosts: payload ? payload.totalPosts : 0,
          postError: null,
        };
      } else {
        const existingPosts = state.posts.map((post) => post._id);
        const newPosts = (payload ? payload.posts : []).filter(
          (post) => !existingPosts.includes(post._id)
        );
        return {
          ...state,
          posts: [...state.posts, ...newPosts],
          totalPosts: payload ? payload.totalPosts : 0,
          postError: null,
        };
      }

    case types.GET_POSTS_FAIL:
      return {
        ...state,
        postError: payload,
      };

    case types.GET_COMMUNITY_POSTS_SUCCESS:
      if (payload.page === 1) {
        return {
          ...state,
          communityPosts: payload ? payload.posts : [],
          totalCommunityPosts: payload ? payload.totalCommunityPosts : 0,
          postError: null,
        };
      } else {
        return {
          ...state,
          communityPosts: [
            ...state.communityPosts,
            ...(payload ? payload.posts : []),
          ],
          totalCommunityPosts: payload ? payload.totalCommunityPosts : 0,
          postError: null,
        };
      }

    case types.GET_COMMUNITY_POSTS_FAIL:
      return {
        ...state,
        postError: payload,
      };

    case types.GET_FOLLOWING_USERS_POSTS_SUCCESS:
      return {
        ...state,
        followingUsersPosts: payload ? payload : [],
        postError: null,
      };

    case types.GET_FOLLOWING_USERS_POSTS_FAIL:
      return {
        ...state,
        postError: payload,
      };

    case types.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        communityPosts: state.communityPosts.filter(
          (post) => post._id !== payload
        ),
        postError: null,
        totalPosts: state.totalPosts - 1,
        totalCommunityPosts: state.totalCommunityPosts - 1,
      };
    case types.DELETE_POST_FAIL:
      return {
        ...state,
        postError: payload,
      };

    case types.UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
        communityPosts: state.communityPosts.map((post) =>
          post._id === payload._id ? payload : post
        ),
        postError: null,
      };
    case types.UPDATE_POST_FAIL:
      return {
        ...state,
        postError: payload,
      };

    case types.LIKE_POST_SUCCESS:
    case types.UNLIKE_POST_SUCCESS:
      const { posts, communityPosts } = updatePostLike(state, payload);
      return {
        ...state,
        posts,
        communityPosts,
        postError: null,
      };
    case types.LIKE_POST_FAIL:
    case types.UNLIKE_POST_FAIL:
      return {
        ...state,
        postError: payload,
      };

    case types.SAVE_POST_SUCCESS:
    case types.UNSAVE_POST_SUCCESS:
    case types.GET_SAVED_POSTS_SUCCESS:
      return {
        ...state,
        savedPosts: payload ? payload : [],
        postError: null,
      };
    case types.SAVE_POST_FAIL:
    case types.UNSAVE_POST_FAIL:
    case types.GET_SAVED_POSTS_FAIL:
      return {
        ...state,
        postError: payload,
      };

    case types.GET_PUBLIC_POSTS_SUCCESS:
      return {
        ...state,
        publicPosts: payload ? payload : [],
        postError: null,
      };
    case types.GET_PUBLIC_POSTS_FAIL:
      return {
        ...state,
        postError: payload,
      };
    case types.INCREASE_SAVED_BY_COUNT:
      return {
        ...state,
        post:
          state.post && state.post._id === payload
            ? {
                ...state.post,
                savedByCount: state.post.savedByCount + 1,
              }
            : state.post,

        postError: null,
      };
    case types.DECREASE_SAVED_BY_COUNT:
      return {
        ...state,
        post:
          state.post && state.post._id === payload
            ? {
                ...state.post,
                savedByCount: state.post.savedByCount - 1,
              }
            : state.post,

        postError: null,
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

export default postReducer;
