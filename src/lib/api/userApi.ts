import axios from 'axios';

export const userApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

userApi.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

userApi.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
