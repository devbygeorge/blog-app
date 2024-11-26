<template>
  <form @submit.prevent="onSubmit" class="auth-form">
    <h2>Login</h2>
    <div class="auth-form__field">
      <label for="username">Username</label>
      <input id="username" v-model="username" type="text" required />
    </div>
    <div class="auth-form__field">
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" required />
    </div>
    <button type="submit" class="auth-form__button">Login</button>

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
import { defineEmits } from "vue";

const username = ref("");
const password = ref("");

const emit = defineEmits(["openRegistration", "openRecovery"]);

const onSubmit = () => {
  alert(`Username: ${username.value}, Password: ${password.value}`);
  // Implement your login logic here
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
