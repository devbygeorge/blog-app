import { defineStore } from "pinia";
import { getBlogs } from "@/services/blogService";

export const useBlogStore = defineStore("blogs", {
  state: () => ({
    blogs: [], // Store the list of blogs
  }),
  actions: {
    async fetchBlogs() {
      try {
        const data = await getBlogs();
        this.blogs = data; // Update blogs state
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    },
    addBlog(newBlog) {
      this.blogs.push(newBlog); // Add a new blog to the list
    },
    updateBlog(updatedBlog) {
      const index = this.blogs.findIndex((blog) => blog.id === updatedBlog.id);
      if (index !== -1) {
        this.blogs[index] = updatedBlog; // Update the blog in the list
      }
    },
  },
});
