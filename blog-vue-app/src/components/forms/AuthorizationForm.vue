<template>
  <form @submit.prevent="onSubmit" class="auth-form">
    <h2>Login</h2>
    <div class="auth-form__field">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" required />
    </div>
    <div class="auth-form__field">
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" required />
    </div>
    <span v-if="isLoading">Logging in...</span>
    <button v-else type="submit" class="auth-form__button">Login</button>

    <!-- Navigation Buttons -->
    <div class="auth-form__links">
      <button type="button" class="auth-form__link" @click="openRegistration">
        Create an account
      </button>
      <button type="button" class="auth-form__link" @click="openRecovery">
        Forgot password?
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { login } from "@/services/authService";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const isLoading = ref(false); // Loading state

const emit = defineEmits(["openRegistration", "openRecovery", "closeModal"]);

const onSubmit = async () => {
  isLoading.value = true; // Disable button and show loading

  try {
    const data = await login({
      email: email.value,
      password: password.value,
    });
    authStore.login(data.user, data.token); // Save user and token
    alert("Login successful!");
    emit("closeModal");
  } catch (err) {
    console.log(err);
    alert(err.response?.data || "Login failed!");
  } finally {
    isLoading.value = false; // Re-enable button
  }
};

const openRegistration = () => {
  emit("openRegistration");
};

const openRecovery = () => {
  emit("openRecovery");
};
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-form__field label {
  font-weight: bold;
}

.auth-form__field input {
  width: 100%;
  padding: 8px;
  border: 1px solid #5e5e5e;
  border-radius: 4px;
}

.auth-form__field input:focus {
  outline: none;
}

.auth-form__button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.auth-form__button:hover {
  background-color: #0056b3;
}

.auth-form__links {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.auth-form__link {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;
}

.auth-form__link:hover {
  color: #0056b3;
}
</style>
