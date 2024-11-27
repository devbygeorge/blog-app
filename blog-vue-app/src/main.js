import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./style.css";
import { useAuthStore } from "@/store/auth";

const app = createApp(App);

app.use(router); // Use the router
app.use(createPinia()); // Add Pinia for state management

// Load auth state from localStorage
const authStore = useAuthStore();
authStore.loadFromStorage();

app.mount("#app"); // Mount the application to the DOM
