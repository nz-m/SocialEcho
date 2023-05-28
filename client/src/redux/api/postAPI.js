import { API, handleApiError } from "./utils";

export const createPost = async (formData) => {
  try {
    const { data } = await API.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { error: null, data };
  } catch (error) {
    const { response } = error;
    if (response?.status === 403) {
      const { type, confirmationToken, info } = response.data || {};
      if (type === "inappropriateContent") {
        return { isInappropriate: true, data: null };
      } else if (type === "failedDetection") {
        return { confirmationToken, data: null };
      } else if (type === "categoryMismatch") {
        return { info, data: null };
      }
    }
    return handleApiError(error);
  }
};

export const confirmPost = async (confirmationToken) => {
  try {
    const { data } = await API.post(`/posts/confirm/${confirmationToken}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const rejectPost = async (confirmationToken) => {
  try {
    const { data } = await API.post(`/posts/reject/${confirmationToken}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPost = async (id) => {
  try {
    const { data } = await API.get(`/posts/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPosts = async (limit = 10, skip = 0) => {
  try {
    const { data } = await API.get(`/posts?limit=${limit}&skip=${skip}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getComPosts = async (communityId, limit = 10, skip = 0) => {
  try {
    const { data } = await API.get(
      `/posts/community/${communityId}?limit=${limit}&skip=${skip}`
    );
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deletePost = async (id) => {
  try {
    const { data } = await API.delete(`/posts/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const likePost = async (id) => {
  try {
    const { data } = await API.patch(`/posts/${id}/like`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const unlikePost = async (id) => {
  try {
    const { data } = await API.patch(`/posts/${id}/unlike`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const addComment = async (id, newComment) => {
  try {
    await API.post(`/posts/${id}/comment`, newComment);
    return { error: null };
  } catch (error) {
    if (error.response?.status === 403) {
      const { type } = error.response.data || {};
      if (type === "inappropriateContent") {
        return { error: "inappropriateContent" };
      }
    }
    return handleApiError(error);
  }
};

export const savePost = async (id) => {
  try {
    const { data } = await API.patch(`/posts/${id}/save`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const unsavePost = async (id) => {
  try {
    const { data } = await API.patch(`/posts/${id}/unsave`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getSavedPosts = async () => {
  try {
    const { data } = await API.get(`/posts/saved`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPublicPosts = async (publicUserId) => {
  try {
    const { data } = await API.get(`/posts/${publicUserId}/userPosts`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getFollowingUsersPosts = async (communityId) => {
  try {
    const { data } = await API.get(`/posts/${communityId}/following`);

    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
