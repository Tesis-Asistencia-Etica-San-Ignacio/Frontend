import axios from 'axios';

export const authApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

authApi.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
);

authApi.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);
