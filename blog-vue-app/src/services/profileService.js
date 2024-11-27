import axiosInstance from "@/axiosInstance";

export const getProfile = async () => {
  const response = await axiosInstance.get("/api/profile");
  return response.data;
};

export const editProfile = async (credentials) => {
  const response = await axiosInstance.put("/api/profile", credentials);
  return response.data;
};

export const editPassword = async (credentials) => {
  const response = await axiosInstance.put("/api/profile/password", credentials);
  return response.data;
};
