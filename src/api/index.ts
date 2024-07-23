// src/axiosConfig.js
import axios from 'axios';
import {apiPath} from './apiPath'

const api = axios.create({
  baseURL: 'https://669f1a2db132e2c136fcb865.mockapi.io',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => {
    return response;
  },
  // (error: AxiosError) => {
  //   // Handle errors globally
  //   return error
  // }
);

export default api;
export {apiPath}
