<template>
  <div class="my-posts-page">
    <h2>My Posts</h2>
    <div v-if="posts.length === 0">You haven't posted anything yet.</div>
    <div v-else>
      <div v-for="post in posts" :key="post._id" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.description }}</p>
        <small>Posted at: {{ formatDate(post.createdAt) }}</small>
        <hr />
      </div>
    </div>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import api from '../api/axios';

export default {
  data() {
    return {
      posts: [],
      message: '',
    };
  },
  methods: {
    async fetchMyPosts() {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/posts/mine', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.posts = res.data.posts;
      } catch (err) {
        this.message = err.response?.data?.message || 'Failed to load posts';
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
  mounted() {
    this.fetchMyPosts();
  },
};
</script>
<style scoped>
.my-posts-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #fafafa;
}

h2 {
  text-align: center;
  font-size: 1.6rem;
  color: #222;
  margin-bottom: 2rem;
}

.post {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.post h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #1a1a1a;
}

.post p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.post small {
  color: #777;
  font-size: 0.85rem;
}

hr {
  margin-top: 1rem;
  border: none;
  border-top: 1px solid #eee;
}

p {
  text-align: center;
  margin-top: 1rem;
  color: #28a745;
}
</style>

