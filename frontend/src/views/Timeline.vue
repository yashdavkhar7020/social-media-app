<template>
  <div class="timeline-page">
    <h2>Timeline</h2>
    <div v-if="posts.length === 0">No posts yet.</div>
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
    async fetchTimeline() {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/posts/timeline', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.posts = res.data.posts;
      } catch (err) {
        this.message = err.response?.data?.message || 'Failed to fetch timeline';
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
  mounted() {
    this.fetchTimeline();
  },
};
</script>

<style scoped>
.timeline-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #fafafa;
}

h2 {
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.post {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.post h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #222;
}

.post p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.post small {
  font-size: 0.85rem;
  color: #777;
}

hr {
  margin-top: 1rem;
  border: none;
  border-top: 1px solid #eee;
}

p {
  text-align: center;
  color: #28a745;
  font-size: 0.95rem;
}
</style>

