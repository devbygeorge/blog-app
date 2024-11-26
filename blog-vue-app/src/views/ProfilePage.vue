<template>
  <div class="profile">
    <div class="profile__card">
      <img
        :src="user.profilePic || '/assets/default-profile.png'"
        alt="Profile Picture"
        class="profile__picture"
      />
      <h2 class="profile__userName">@{{ user.userName }}</h2>
      <p class="profile__email">{{ user.email }}</p>
      <button class="profile__edit-button" @click="goToEditProfile">
        Edit Profile
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

// Example user data (replace with real user data from your store or API)
const user = ref({
  userName: "johndoe",
  email: "john.doe@example.com",
  profilePic: "/profile-placeholder.jpg", // Replace with a real image URL
});

const router = useRouter();

const goToEditProfile = () => {
  router.push("/profile/edit");
};
</script>

<style scoped>
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #3a3939;
}

.profile__card {
  background-color: #1f1e1e;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #5e5e5e;
  text-align: center;
  width: 300px;
}

.profile__picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
}

.profile__name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.profile__email {
  font-size: 1rem;
  color: #666;
  margin-bottom: 16px;
}

.profile__edit-button {
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.profile__edit-button:hover {
  background-color: #0056b3;
}
</style>
