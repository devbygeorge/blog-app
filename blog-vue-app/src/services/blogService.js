import axiosInstance from "@/axiosInstance";

export const getBlogs = async () => {
  const response = await axiosInstance.get("/api/blogs");
  return response.data;
};

export const getBlog = async (id) => {
  const response = await axiosInstance.get(`/api/blogs/${id}`);
  return response.data;
};

export const createBlog = async (data) => {
  const response = await axiosInstance.post("/api/blogs", data);
  return response.data;
};

export const editBlog = async (id, data) => {
  const response = await axiosInstance.put(`/api/blogs/${id}`, data);
  return response.data;
};

export const addComment = async (data) => {
  const response = await axiosInstance.post("/api/comments", data);
  return response.data;
};

export const editComment = async (id, data) => {
  const response = await axiosInstance.put(`/api/comments/${id}`, data);
  return response.data;
};
