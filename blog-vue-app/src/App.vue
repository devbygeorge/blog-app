<template>
  <div id="app">
    <HeaderComponent />
    <main>
      <router-view />
      <!-- This is where the active route's component will render -->
    </main>
    <footer>
      <p>&copy; 2024 My App</p>
    </footer>
  </div>
</template>

<script setup>
// You can import styles or any required data here
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>

<style>
/* Add styles for your application */
</style>
