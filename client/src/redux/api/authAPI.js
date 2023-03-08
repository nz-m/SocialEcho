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

const signIn = async (formData) => {
  try {
    const res = await API.post("/users/signin", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};

const signUp = async (formData) => {
  try {
    const res = await API.post("/users/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};

const logout = async (refreshToken) => {
  try {
    const res = await API.post(
      "/users/logout",
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};

const getModProfile = async () => {
  try {
    const res = await API.get("/users/moderator");
    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};

export { signIn, signUp, logout, getModProfile };
