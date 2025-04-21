import axios from "axios";

export const instance = axios.create({
  baseURL: "https://brainpin.onrender.com",
  withCredentials: true,
});

// Add request interceptor to include token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      // Optionally redirect to login
      // Note: You can't use navigate here directly; handle redirection in components
    }
    return Promise.reject(error);
  }
);