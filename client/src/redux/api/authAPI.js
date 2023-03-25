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

const signIn = async (formData) => {
  try {
    const res = await API.post("/users/signin", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: res.data };
  } catch (err) {
    return handleApiError(err);
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
    return {
      error: err.response.data.errors,
      data: null,
    };
  }
};

const logout = async () => {
  try {
    const res = await API.post("/users/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: res.data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getModProfile = async () => {
  try {
    const res = await API.get("/users/moderator");
    return { error: null, data: res.data };
  } catch (err) {
    return handleApiError(err);
  }
};

export { signIn, signUp, logout, getModProfile };
