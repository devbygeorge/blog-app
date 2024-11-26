import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      userName: "johndoe",
      email: "johndoe@gmail.com",
    }, // Holds user information, null if not logged in
    token: "jwt-token-123", // Stores the authentication token
  }),

  getters: {
    isAuthorized: (state) => !!state.token, // Returns true if token exists
    userInfo: (state) => state.user,
  },

  actions: {
    login(userData, token) {
      this.user = userData; // Example: { id: 1, username: "JohnDoe" }
      this.token = token; // Example: "jwt-token-123"
    },

    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
