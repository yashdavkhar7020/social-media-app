<template>
  <div id="app">
    <Navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Navbar from './components/Navbar.vue';

const route = useRoute();

const showNavbar = computed(() => {
  return !['/login', '/signup'].includes(route.path);
});
</script>

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f8fa;
  color: #14171a;
  line-height: 1.6;
}

button {
  font-family: inherit;
  border-radius: 8px;
  transition: all 0.3s ease;
}

input,
textarea {
  border-radius: 8px;
  border: 1px solid #ccd6dd;
  background: #fff;
}

a {
  text-decoration: none;
  color: #1da1f2;
}

