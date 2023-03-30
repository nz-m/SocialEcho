import * as types from "../constants/postConstants";

const initialState = {
  posts: [],
  publicPosts: [],
  communityPosts: [],
  followingUsersPosts: [],
  comments: [],
  savedPosts: [],
  postError: null,
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, payload],
        postError: null,
      };
    case types.CREATE_POST_FAIL:
      return {
        ...state,
        postError: payload,
      };
    case types.GET_POSTS_SUCCESS:
      if (payload.page === 1) {
        return {
          ...state,
          posts: payload ? payload.posts : [],
          postError: null,
        };
      } else {
        return {
          ...state,
          posts: [...state.posts, ...(payload ? payload.posts : [])],
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
          postError: null,
        };
      } else {
        return {
          ...state,
          communityPosts: [
            ...state.communityPosts,
            ...(payload ? payload.posts : []),
          ],
          postError: null,
        };
      }

    case types.GET_COMMUNITY_POSTS_FAIL:
      return {
        ...state,
        postError: payload,
      };

    case types.GET_FOLLOWING_USERS_POSTS_SUCCESS:
      if (payload.page === 1) {
        return {
          ...state,
          followingUsersPosts: payload ? payload.posts : [],
          postError: null,
        };
      } else {
        return {
          ...state,
          followingUsersPosts: [
            ...state.followingUsersPosts,
            ...(payload ? payload.posts : []),
          ],
          postError: null,
        };
      }

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

    case types.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: payload,
        postError: null,
      };
    case types.GET_COMMENTS_FAIL:
      return {
        ...state,
        postError: payload,
      };

    case types.DELETE_COMMENT_SUCCESS:
      const { postsUpdateD, communityPostsUpdateD } = updateComment(
        state,
        payload
      );
      return {
        ...state,
        comments: state.comments.filter((comment) => comment._id !== payload),
        posts: postsUpdateD,
        communityPosts: communityPostsUpdateD,
        postError: null,
      };
    case types.DELETE_COMMENT_FAIL:
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
        posts: state.posts.map((post) =>
          post._id === payload
            ? { ...post, savedByCount: post.savedByCount + 1 }
            : post
        ),
        communityPosts: state.communityPosts.map((post) =>
          post._id === payload
            ? { ...post, savedByCount: post.savedByCount + 1 }
            : post
        ),
        postError: null,
      };
    case types.DECREASE_SAVED_BY_COUNT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload
            ? {
                ...post,
                savedByCount: post.savedByCount - 1,
              }
            : post
        ),
        communityPosts: state.communityPosts.map((post) =>
          post._id === payload
            ? {
                ...post,
                savedByCount: post.savedByCount - 1,
              }
            : post
        ),
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
