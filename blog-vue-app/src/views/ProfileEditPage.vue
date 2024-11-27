<template>
  <div class="profile-edit">
    <div class="profile-edit__card">
      <h2>Edit Profile</h2>
      <form @submit.prevent="updateProfile">
        <div class="profile-edit__field">
          <label for="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            v-model="formData.currentPassword"
            type="password"
            required
          />
        </div>

        <div class="profile-edit__field">
          <label for="newPassword">New Password</label>
          <input
            id="newPassword"
            v-model="formData.newPassword"
            type="password"
            required
          />
        </div>

        <div class="profile-edit__field">
          <label for="repeatNewPassword">Repeat New Password</label>
          <input
            id="repeatNewPassword"
            v-model="formData.repeatNewPassword"
            type="password"
            required
          />
        </div>

        <div class="profile-edit__field">
          <label for="profilePic"
            >Profile Picture
            <span class="profile-edit__field-small-label"
              >(Coming Soon)</span
            ></label
          >
          <input id="profilePic" type="file" @change="handleFileUpload" />
        </div>

        <span v-if="isLoading">Updating...</span>
        <button v-else type="submit" class="profile-edit__save-button">
          Save
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { editPassword } from "@/services/profileService";
const isLoading = ref(false); // Loading state

const formData = ref({
  currentPassword: null,
  newPassword: null,
  repeatNewPassword: null,
  profilePic: null, // Handle image uploads
});

const updateProfile = async () => {
  // Basic Validation
  if (formData.value.newPassword !== formData.value.repeatNewPassword) {
    alert("New passwords do not match.");
    return;
  }

  isLoading.value = true;

  try {
    const data = await editPassword({
      currentPassword: formData.value.currentPassword,
      newPassword: formData.value.newPassword,
    });
    alert("Password updated successfully!");
    formData.value.currentPassword = null;
    formData.value.newPassword = null;
    formData.value.repeatNewPassword = null;
  } catch (err) {
    console.log(err);
    alert(err.response?.data || "Password update failed!");
  } finally {
    isLoading.value = false; // Re-enable button
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      formData.value.profilePic = reader.result; // Base64 representation
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
.profile-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #3a3939;
}

.profile-edit__card {
  background-color: #1f1e1e;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
}

.profile-edit__field {
  margin-bottom: 16px;
  text-align: left;
}

.profile-edit__field label {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.profile-edit__field input {
  width: 100%;
  padding: 8px;
  border: 1px solid #5e5e5e;
  border-radius: 4px;
}

.profile-edit__save-button {
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.profile-edit__save-button:hover {
  background-color: #0056b3;
}

.profile-edit__field-small-label {
  font-size: 9px;
}
</style>
