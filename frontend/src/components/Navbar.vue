<template>
  <nav class="navbar" v-if="isLoggedIn">
    <router-link to="/timeline">Home</router-link>
    <router-link to="/create">Create</router-link>
    <router-link to="/users">Users</router-link>
    <router-link to="/myposts">My Posts</router-link>
    <router-link to="/profile">Profile</router-link>
  </nav>
</template>


<script>
export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar a {
  text-decoration: none;
  color: #1a1a1a;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.navbar a:hover {
  background-color: #f0f0f0;
}

.navbar a.router-link-exact-active {
  color: #1da1f2;
  font-weight: bold;
}
</style>
