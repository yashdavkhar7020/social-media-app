<template>
  <div class="create-post">
    <h2>Create a Post</h2>
    <form @submit.prevent="submitPost">
      <input v-model="title" placeholder="Title" required />
      <textarea v-model="description" placeholder="Description" required></textarea>
      <button type="submit">Post</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import api from '../api/axios';

export default {
  data() {
    return {
      title: '',
      description: '',
      message: '',
    };
  },
  methods: {
    async submitPost() {
      try {
        const token = localStorage.getItem('token');
        const res = await api.post(
          '/posts',
          {
            title: this.title,
            description: this.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.message = res.data.message;
        this.$router.push('/timeline');
      } catch (err) {
        this.message = err.response?.data?.message || 'Post creation failed';
      }
    },
  },
};
</script>

<style scoped>
.create-post {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: #222;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

input,
textarea {
  font-size: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
  outline: none;
  transition: border 0.2s ease;
}

input:focus,
textarea:focus {
  border-color: #1da1f2;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

button {
  background-color: #1da1f2;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #0d8ddb;
}

p {
  margin-top: 1rem;
  color: green;
  text-align: center;
}
</style>
