import axios from 'axios';

const SERVER_URL = 'https://api.giphy.com';
const BASE_URL = `${SERVER_URL}/v1/gifs`;
const API_KEY = 'YOUR_GIPHY_API_KEY';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
  timeout: 20 * 1000,
});

client.interceptors.request.use(
  async config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export {client, API_KEY};
