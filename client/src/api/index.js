import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const url = `${BASE_URL}/posts`;

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);


// Create User
export const createUser = (newUser) => axios.post(`${BASE_URL}/users`, newUser);
   
