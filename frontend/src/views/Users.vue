<template>
  <div class="users-page">
    <h2>Users</h2>
    <div v-if="users.length === 0">No users found.</div>
    <div v-else>
      <div v-for="user in users" :key="user._id" class="user-card">
        <p><strong>{{ user.username }}</strong> ({{ user.email }})</p>
        <button v-if="isFollowing(user._id)" @click="unfollowUser(user._id)">
          Unfollow
        </button>
        <button v-else @click="followUser(user._id)">
          Follow
        </button>
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
      users: [],
      following: [],
      currentUserId: '',
      message: '',
    };
  },
  methods: {
    async loadUsers() {
      try {
        const token = localStorage.getItem('token');

        // Fetch all users
        const res = await api.get('/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.users = res.data;

        // Decode token to get current user ID
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.currentUserId = payload.sub;

        // Find yourself in the users list and extract following[]
        const me = this.users.find((u) => u._id === this.currentUserId);
        this.following = me?.following || [];
      } catch (err) {
        this.message = err.response?.data?.message || 'Failed to load users';
      }
    },

    isFollowing(userId) {
      return this.following.includes(userId);
    },

    async followUser(userId) {
      try {
        const token = localStorage.getItem('token');
        await api.post(`/users/follow/${userId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.message = 'Followed successfully';
        await this.loadUsers(); // Reload updated list
      } catch (err) {
        this.message = err.response?.data?.message || 'Follow failed';
      }
    },

    async unfollowUser(userId) {
      try {
        const token = localStorage.getItem('token');
        await api.post(`/users/unfollow/${userId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.message = 'Unfollowed successfully';
        await this.loadUsers(); // Reload updated list
      } catch (err) {
        this.message = err.response?.data?.message || 'Unfollow failed';
      }
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style scoped>
.users-page {
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

.user-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.user-card p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

button {
  background-color: #1da1f2;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0d8ddb;
}

p {
  text-align: center;
  margin-top: 1rem;
  color: #28a745;
  font-size: 0.95rem;
}
</style>

