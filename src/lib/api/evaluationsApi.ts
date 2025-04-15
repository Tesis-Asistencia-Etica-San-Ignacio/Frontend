import axios from 'axios';

export const evaluationsApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Si el backend utiliza cookies httpOnly
});

// Interceptor para inyectar el token (si es que se guarda en localStorage o en otro lugar)
evaluationsApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // O el nombre que uses para tu token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Nota: No se agrega un interceptor de respuesta para el refresco de token, ya que no es necesario para las evaluaciones.
