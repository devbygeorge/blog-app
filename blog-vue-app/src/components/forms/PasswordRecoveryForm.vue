<template>
  <form @submit.prevent="onSubmit" class="recovery-form">
    <h2>Recover Password</h2>

    <!-- Email Field -->
    <div class="recovery-form__field">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        placeholder="Enter your email"
      />
    </div>

    <!-- Submit Button -->
    <button type="submit" class="recovery-form__button">
      Send Recovery Link
    </button>

    <!-- Success Message -->
    <p v-if="successMessage" class="recovery-form__success">
      {{ successMessage }}
    </p>
  </form>
</template>

<script setup>
import { ref } from "vue";

// Reactive email field
const email = ref("");

// Success message
const successMessage = ref("");

// Form submission logic
const onSubmit = () => {
  if (!email.value.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate API call for password recovery
  successMessage.value = `A recovery link has been sent to ${email.value}`;
  email.value = ""; // Clear email field
};
</script>

<style scoped>
.recovery-form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.recovery-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.recovery-form__field {
  margin-bottom: 16px;
}

.recovery-form__field label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.recovery-form__field input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.recovery-form__button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.recovery-form__button:hover {
  background-color: #0056b3;
}

.recovery-form__success {
  margin-top: 16px;
  color: green;
  font-size: 0.9rem;
  text-align: center;
}
</style>
