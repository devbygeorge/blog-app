<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <router-link to="/">My Blog</router-link>
      </div>
      <nav class="header__nav">
        <router-link to="/" class="header__link">Home</router-link>
        <router-link
          v-if="authStore.isAuthorized"
          to="/profile"
          class="header__link"
        >
          Profile
        </router-link>
        <button
          v-if="!authStore.isAuthorized"
          @click="openAuthorizeModal"
          class="header__button"
        >
          Authorize
        </button>
        <button
          v-if="authStore.isAuthorized"
          @click="logout"
          class="header__button"
        >
          Logout
        </button>
      </nav>
    </div>
    <!-- Authorization Modal -->
    <ModalComponent :isOpen="isAuthorizeModalOpen" @close="closeModal">
      <AuthorizationForm
        @openRegistration="openRegistrationModal"
        @openRecovery="openRecoveryModal"
        @closeModal="closeModal"
      />
    </ModalComponent>

    <!-- Registration Modal -->
    <ModalComponent :isOpen="isRegistrationModalOpen" @close="closeModal">
      <RegistrationForm />
    </ModalComponent>

    <!-- Password Recovery Modal -->
    <ModalComponent :isOpen="isRecoveryModalOpen" @close="closeModal">
      <PasswordRecoveryForm />
    </ModalComponent>
  </header>
</template>

<script setup>
import { ref } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";
import AuthorizationForm from "@/components/forms/AuthorizationForm.vue";
import RegistrationForm from "@/components/forms/RegistrationForm.vue";
import PasswordRecoveryForm from "@/components/forms/PasswordRecoveryForm.vue";

import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  alert("You have been logged out.");
};

// Modal states
const isAuthorizeModalOpen = ref(false);
const isRegistrationModalOpen = ref(false);
const isRecoveryModalOpen = ref(false);

// Methods to open/close modals
const openAuthorizeModal = () => {
  isAuthorizeModalOpen.value = true;
  isRegistrationModalOpen.value = false;
  isRecoveryModalOpen.value = false;
};

const openRegistrationModal = () => {
  isAuthorizeModalOpen.value = false;
  isRegistrationModalOpen.value = true;
  isRecoveryModalOpen.value = false;
};

const openRecoveryModal = () => {
  isAuthorizeModalOpen.value = false;
  isRegistrationModalOpen.value = false;
  isRecoveryModalOpen.value = true;
};

const closeModal = () => {
  isAuthorizeModalOpen.value = false;
  isRegistrationModalOpen.value = false;
  isRecoveryModalOpen.value = false;
};
</script>

<style scoped>
.header {
  background-color: #1f1e1e;
  color: #fff;
  padding: 16px 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.header__logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header__link {
  font-size: 1rem;
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.header__link:hover {
  color: #007bff;
}

.header__button {
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.header__button:hover {
  background-color: #0056b3;
}
</style>
