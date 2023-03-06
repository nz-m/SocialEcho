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

// sign in
export const signIn = (formData) => {
  return API.post("/users/signin", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

// Sign Up
export const signUp = (formData) => {
  return API.post("/users/signup", formData, {
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

// logout
export const logout = (refreshToken) => {
  return API.post(
    "/users/logout",
    { refreshToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

// get moderator profile
export const getModProfile = () => {
  return API.get("/users/moderator")
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};
