import axios from "axios";

export const instance = axios.create({
  baseURL: "https://brainpin.onrender.com",
  withCredentials: true,
});

// Add response interceptor for error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors (e.g., 401 Unauthorized)
    if (error.response?.status === 401) {
      // Optionally redirect to login or clear auth token
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);