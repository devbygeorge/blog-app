import axios from "axios";

// Get the base URL from environment variables
const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const instance = axios.create({
  baseURL,
});

// Set token if available
const token = localStorage.getItem("token");
if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default instance;
