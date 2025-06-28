import { createRouter, createWebHistory } from 'vue-router';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Timeline from '../views/Timeline.vue';
import CreatePost from '../views/CreatePost.vue';
import Users from '../views/Users.vue';
import MyPosts from '../views/MyPosts.vue';
import Profile from '../views/Profile.vue';

const routes = [
  { path: '/', redirect: '/timeline' },
 
  { path: '/signup', component: Signup },
  { path: '/login', component: Login },
  { path: '/timeline', component: Timeline }, 
  { path: '/create', component: CreatePost }, 
  { path: '/users', component: Users }, 
  { path: '/myposts', component: MyPosts }, 
  { path: '/profile', component: Profile }, // ✅ Add this
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
