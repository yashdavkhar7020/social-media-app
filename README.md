📘 Social Media Web App (NestJS + VueJS + MongoDB) 🚀 Overview

This is a full-stack social media web application built using modern web technologies:
Backend: NestJS (Node.js framework)
Frontend: Vue 3 with Vite
Database: MongoDB (MongoDB Atlas)
Authentication: JSON Web Token (JWT)
Styling: CSS with optional PrimeVue

It supports core features like:
User Signup and Login
Creating and viewing posts
Following/unfollowing other users
Viewing a timeline (posts from followed users)
Viewing personal profile with post history and follower/following count

📁 Project Structure
Backend
Located in the /backend directory:
src/auth: Handles user authentication (signup, login), JWT strategy
src/users: User management, follow/unfollow functionality
src/posts: Post creation and timeline fetching
app.module.ts: Root module for combining all features
main.ts: Entry point for the NestJS app
.env: MongoDB URI and JWT secret values
package.json: Lists dependencies and scripts
tsconfig.json: TypeScript configuration

Frontend
Located in the /frontend directory:
src/views: Main pages (Login.vue, Signup.vue, Timeline.vue, Profile.vue, etc.)
src/components: Navbar and reusable UI components
src/api/axios.js: Axios instance configured with base URL
src/router/index.js: Route definitions and guards
App.vue and main.js: Vue app entry and root component
.env: Frontend environment variables (e.g., VITE_API_BASE)
vite.config.js: Vite build config

🔐 JWT Authentication Flow
User signs up or logs in, backend generates a JWT.
JWT is returned to frontend and saved in localStorage.
All protected API routes require Authorization: Bearer <token>.
The backend uses JwtAuthGuard and jwt.strategy.ts to decode the token.
User ID from the token (req.user.userId) is used to perform authorized actions.

📌 Key Features
Signup/Login with JWT authentication
Authenticated post creation and fetching
Follow and unfollow functionality
Timeline showing posts from followed users
User profile showing your posts and follower stats
Protected routes using route guards (frontend and backend)
Clean and responsive UI with custom styles

🧪 API Endpoints Summary
Authentication:
POST /auth/signup – Register user
POST /auth/login – Log in and receive JWT
Posts:
POST /posts – Create a new post
GET /posts/mine – View your own posts
GET /posts/timeline – View timeline of followed users
Users:
GET /users – Get all users
POST /users/follow/:id – Follow a user
POST /users/unfollow/:id – Unfollow a user
All except signup/login require a JWT token in headers.

💻 Setup Instructions
Backend Setup
Navigate to backend/
Install dependencies with npm install
Create a .env file with the following:
MONGO_URI=****
JWT_SECRET=***
JWT_EXPIRES_IN=1d
Run locally using: npm run start:dev

Frontend Setup
Navigate to frontend/
Install dependencies with npm install
Create a .env file with:
VITE_API_BASE=http://localhost:3000
Start frontend: npm run dev


👨‍💻 Author
Developed with 💙 by Yash Davkhar
GitHub: @yashdavkhar7020
Linkedin: https://www.linkedin.com/in/yash-davkhar/
