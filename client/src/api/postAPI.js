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

export const createPost = (formData) => {
  return API.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

export const getPosts = (userId) => {
  return API.get(`/posts?userId=${userId}`)
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

export const getComPosts = (id) => {
  return API.get(`posts/${id}`)
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`)
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

export const likePost = (id, userId) => {
  return API.patch(`/posts/${id}/like`, { userId })
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

export const unlikePost = (id, userId) => {
  return API.patch(`/posts/${id}/unlike`, { userId })
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

export const addComment = (id, newComment) => {
  return API.post(`/posts/${id}/comment`, { newComment })
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

export const getComments = (id) => {
  return API.get(`/posts/${id}/comment`)
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};
