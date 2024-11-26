<template>
  <form @submit.prevent="onSubmit" class="registration-form">
    <h2>Register</h2>

    <!-- Username Field -->
    <div class="registration-form__field">
      <label for="username">Username</label>
      <input
        id="username"
        v-model="form.username"
        type="text"
        required
        placeholder="Enter your username"
      />
    </div>

    <!-- Email Field -->
    <div class="registration-form__field">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        placeholder="Enter your email"
      />
    </div>

    <!-- Password Field -->
    <div class="registration-form__field">
      <label for="password">Password</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        required
        placeholder="Enter your password"
      />
    </div>

    <!-- Repeat Password Field -->
    <div class="registration-form__field">
      <label for="repeat-password">Repeat Password</label>
      <input
        id="repeat-password"
        v-model="form.repeatPassword"
        type="password"
        required
        placeholder="Repeat your password"
      />
    </div>

    <!-- Submit Button -->
    <button type="submit" class="registration-form__button">Register</button>

    <!-- Error Message -->
    <p v-if="errorMessage" class="registration-form__error">
      {{ errorMessage }}
    </p>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const errorMessage = ref("");

const onSubmit = () => {
  // Basic Validation
  if (form.password !== form.repeatPassword) {
    errorMessage.value = "Passwords do not match.";
    return;
  }

  if (!form.email.includes("@")) {
    errorMessage.value = "Invalid email address.";
    return;
  }

  // Simulate successful registration
  alert("Registration successful!");
  errorMessage.value = "";
  console.log("Form submitted:", form);

  // Clear the form
  form.username = "";
  form.email = "";
  form.password = "";
  form.repeatPassword = "";
};
</script>

<style scoped>
.registration-form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.registration-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.registration-form__field {
  margin-bottom: 16px;
}

.registration-form__field label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.registration-form__field input {
  width: 100%;
  padding: 8px;
  border: 1px solid #5e5e5e;
  border-radius: 4px;
}

.registration-form__button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.registration-form__button:hover {
  background-color: #0056b3;
}

.registration-form__error {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
