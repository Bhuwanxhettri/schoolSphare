import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sms-twox.onrender.com/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
