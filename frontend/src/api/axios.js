import axios from 'axios'

const baseURL = import.meta.env.PROD
  ? 'https://social-media-app-c4pe.onrender.com/' // ← change this to your real backend URL
  : '/api'

const api = axios.create({ baseURL })
export default api
