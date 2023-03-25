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

const handleApiError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    // The API returned an error message
    return { error: error.response.data.message, data: null };
  } else {
    // An unexpected error occurred
    return { error: "An unexpected error occurred.", data: null };
  }
};
const getUser = async (id) => {
  try {
    const { data } = await API.get(`/users/${id}`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const updateUser = async (id, formData) => {
  try {
    const { data } = await API.put(`/users/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getPublicUsers = async () => {
  try {
    const { data } = await API.get("/users/public-users");
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};
const getPublicUser = async (id) => {
  try {
    const { data } = await API.get(`/users/public-users/${id}`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const followUser = async (id) => {
  try {
    const { data } = await API.patch(`/users/${id}/follow`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const unfollowUser = async (id) => {
  try {
    const { data } = await API.patch(`/users/${id}/unfollow`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getFollowingUsers = async () => {
  try {
    const { data } = await API.get("/users/following");
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

export {
  getUser,
  updateUser,
  getPublicUsers,
  followUser,
  getPublicUser,
  unfollowUser,
  getFollowingUsers,
};
