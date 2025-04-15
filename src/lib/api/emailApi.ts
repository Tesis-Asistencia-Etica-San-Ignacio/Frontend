import axios from "axios";

export const emailApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

emailApi.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

emailApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Email API Error:", error);
        return Promise.reject(error);
    }
);
