import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import BlogDetailPage from "@/views/BlogDetailPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import ProfileEditPage from "@/views/ProfileEditPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/blog/:id", name: "BlogDetail", component: BlogDetailPage },
  { path: "/profile", name: "Profile", component: ProfilePage },
  { path: "/profile/edit", name: "ProfileEdit", component: ProfileEditPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore();
//   if (to.meta.requiresAuth && !userStore.token) {
//     // Show login popup or redirect to home
//     next("/");
//   } else {
//     next();
//   }
// });

export default router;