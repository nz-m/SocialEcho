import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

// remove later
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);

// sign in
export const signIn = (formData) => {
  return API.post("/users/signin", formData)
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

// Sign Up
export const signUp = (formData) => {
  return API.post("/users/signup", formData)
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

// logout
export const logout = (refreshToken) => {
  return API.post("/users/logout", { refreshToken })
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};
