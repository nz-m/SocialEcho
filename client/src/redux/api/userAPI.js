import { API, handleApiError } from "./utils";

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
