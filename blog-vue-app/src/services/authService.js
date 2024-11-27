import axiosInstance from "@/axiosInstance";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/api/auth/login", credentials);
  return response.data; // Return user data and token
};

export const register = async (credentials) => {
  const response = await axiosInstance.post("/api/auth/register", credentials);
  return response.data;
};

export const forgotPassword = async (credentials) => {
  const response = await axiosInstance.post("/api/auth/forgot-password", credentials);
  return response.data;
};

export const resetPassword = async (credentials) => {
  const response = await axiosInstance.post("/api/auth/reset-password", credentials);
  return response.data;
};
