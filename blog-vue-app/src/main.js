import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./style.css";

const app = createApp(App);

app.use(router); // Use the router
app.use(createPinia()); // Add Pinia for state management

app.mount("#app"); // Mount the application to the DOM
