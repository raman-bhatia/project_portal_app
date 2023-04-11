import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000' // change this to your Django backend URL
});

export default api;