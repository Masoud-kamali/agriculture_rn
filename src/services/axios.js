import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://185.231.115.46/api/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default instance;
