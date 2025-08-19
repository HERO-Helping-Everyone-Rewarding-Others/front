import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // ajuste se sua API estiver em outra porta/url
});

// Intercepta e adiciona o token em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
