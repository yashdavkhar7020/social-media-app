<template>
  <div class="profile-page">
    <h2>Your Profile</h2>

    <div v-if="user">
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Followers:</strong> {{ user.followers?.length || 0 }}</p>
      <p><strong>Following:</strong> {{ user.following?.length || 0 }}</p>
    </div>

    <h3>Your Posts</h3>
    <div v-if="posts.length === 0">No posts yet.</div>
    <div v-else>
      <div v-for="post in posts" :key="post._id" class="post">
        <h4>{{ post.title }}</h4>
        <p>{{ post.description }}</p>
        <small>Posted: {{ formatDate(post.createdAt) }}</small>
        <hr />
      </div>
    </div>

    <button class="logout-btn" @click="logout">🚪 Logout</button>
  </div>
</template>

<script>
import api from '../api/axios';

export default {
  data() {
    return {
      user: null,
      posts: [],
    };
  },
  methods: {
    async loadProfile() {
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.sub;

      try {
        // Get all users, then find yourself
        const usersRes = await api.get('/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.user = usersRes.data.find((u) => u._id === userId);

        // Get your posts
        const postsRes = await api.get('/posts/mine', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.posts = postsRes.data.posts;
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
  mounted() {
    this.loadProfile();
  },
};
</script>

<style scoped>
.profile-page {
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

.profile-page p {
  font-size: 1rem;
  color: #333;
  margin: 0.3rem 0;
}

h3 {
  margin-top: 2rem;
  font-size: 1.4rem;
  color: #1a1a1a;
}

.post {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.post h4 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #222;
}

.post p {
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 0.4rem;
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

.logout-btn {
  display: block;
  margin: 2rem auto 0;
  background-color: #e02424;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #b91c1c;
}
</style>

