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

const getUser = async (id) => {
  try {
    const { data } = await API.get(`/users/${id}`);
    return { error: null, data };
  } catch (error) {
    return { error: error.message, data: null };
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
  } catch (error) {
    return { error: error.message, data: null };
  }
};

const getPublicUsers = async () => {
  try {
    const { data } = await API.get("/users/public-users");
    return { error: null, data };
  } catch (error) {
    return { error: error.message, data: null };
  }
};
const getPublicUser = async (id) => {
  try {
    const { data } = await API.get(`/users/public-users/${id}`);
    return { error: null, data };
  } catch (error) {
    return { error: error.message, data: null };
  }
};

const followUser = async (id) => {
  try {
    const { data } = await API.patch(`/users/${id}/follow`);
    return { error: null, data };
  } catch (error) {
    return { error: error.message, data: null };
  }
};

export { getUser, updateUser, getPublicUsers, followUser, getPublicUser };
