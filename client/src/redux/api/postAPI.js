import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use((req) => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

const createPost = async (formData) => {
  try {
    const { data } = await API.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { error: null, data };
  } catch (err) {
    return { error: err.response.data.message, data: null };
  }
};

const getPosts = async (userId, limit = 10, skip = 0) => {
  try {
    const { data } = await API.get(
      `/posts?userId=${userId}&limit=${limit}&skip=${skip}`
    );
    return { error: null, data };
  } catch (err) {
    return { error: err.response.data.message, data: null };
  }
};

const getComPosts = async (id, limit = 10, skip = 0) => {
  try {
    const { data } = await API.get(`/posts/${id}?limit=${limit}&skip=${skip}`);
    return { error: null, data };
  } catch (err) {
    return { error: err.response.data.message, data: null };
  }
};

const deletePost = async (id) => {
  try {
    const { data } = await API.delete(`/posts/${id}`);
    return { error: null, data };
  } catch (err) {
    return { error: err.response.data.message, data: null };
  }
};

const likePost = async (id, userId) => {
  try {
    const { data } = await API.patch(`/posts/${id}/like`, { userId });
    return { error: null, data };
  } catch (err) {
    return { error: err.response.data.message, data: null };
  }
};

const unlikePost = async (id, userId) => {
  try {
    const { data } = await API.patch(`/posts/${id}/unlike`, { userId });
    return { error: null, data };
  } catch (err) {
    return { error: err.response.data.message, data: null };
  }
};

const addComment = async (id, newComment) => {
  try {
    const { data } = await API.post(`/posts/${id}/comment`, { newComment });
    return { error: null, data };
  } catch (err) {
    return { error: err.response.data.message, data: null };
  }
};

const getComments = async (id) => {
  try {
    const { data } = await API.get(`/posts/${id}/comment`);
    return { error: null, data };
  } catch (err) {
    return { error: err.response.data.message, data: null };
  }
};

const savePost = async (id) => {
  try {
    const { data } = await API.patch(`/posts/${id}/save`);
    return { error: null, data };
  } catch (err) {
    return { error: err.response.data.message, data: null };
  }
};

const unsavePost = async (id) => {
  try {
    const { data } = await API.patch(`/posts/${id}/unsave`);
    return { error: null, data };
  } catch (err) {
    return { error: err.response.data.message, data: null };
  }
};

const getSavedPosts = async () => {
  try {
    const { data } = await API.get(`/posts/saved`);
    return { error: null, data };
  } catch (err) {
    return { error: err.response.data.message, data: null };
  }
};

export {
  createPost,
  getPosts,
  getComPosts,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  getComments,
  savePost,
  unsavePost,
  getSavedPosts,
};
