import axios from "axios";

// This single axios instance is used by the frontend whenever it talks to Express.
// Keeping the base URL here means admin pages do not repeat "http://localhost:5000/api/".
const API = axios.create({
  baseURL: "https://resumeanalyzer-s5uv.onrender.com/api/",
  // Allows browser cookies to be sent with requests if the backend sets them.
  withCredentials: true,
});

// Before every request, attach the JWT from localStorage.
// Backend authMiddleware reads this Authorization header and verifies the user.
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
