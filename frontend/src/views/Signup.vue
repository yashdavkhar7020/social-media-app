<template>
  <div class="signup-page">
    <h2>Signup</h2>
    <form @submit.prevent="signupUser">
      <input v-model="username" placeholder="Username" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
    <!-- Add this below the form -->
<p>
  Already have an account?
  <button @click="$router.push('/login')">Login</button>
</p>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import api from '../api/axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      message: '',
    };
  },
  methods: {
    async signupUser() {
      try {
        const res = await api.post('/auth/signup', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.message = res.data.message;
        this.$router.push('/login'); // redirect to login page
      } catch (err) {
        this.message = err.response?.data?.message || 'Signup failed';
      }
    },
  },
};
</script>

<style scoped>
.signup-page {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #1a1a1a;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  font-size: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
}

input:focus {
  border-color: #1da1f2;
}

button {
  background-color: #1da1f2;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 0.5rem;
}

button:hover {
  background-color: #0d8ddb;
}

p {
  margin-top: 1rem;
  font-size: 0.95rem;
}

p button {
  background: none;
  border: none;
  color: #1da1f2;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  padding: 0;
}

p button:hover {
  text-decoration: underline;
}
</style>

