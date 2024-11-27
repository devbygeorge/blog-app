import { defineStore } from "pinia";
import axiosInstance from "@/axiosInstance";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null, // Holds user information, null if not logged in
    token: null, // Stores the authentication token
  }),

  getters: {
    isAuthorized: (state) => !!state.token, // Returns true if token exists
    userInfo: (state) => state.user,
  },

  actions: {
    login(userData, token) {
      this.user = userData;
      this.token = token;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      // Set token in Axios for future requests
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },

    logout() {
      this.user = null;
      this.token = null;

      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Remove token from Axios headers
      delete axiosInstance.defaults.headers.common["Authorization"];
    },

    loadFromStorage() {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (user && token) {
        this.user = JSON.parse(user);
        this.token = token;

        // Set token in Axios
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    },
  },
});
