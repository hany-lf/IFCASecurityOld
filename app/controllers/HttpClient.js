/** @format */

import axios from 'axios';
import { urlApi } from "@config/services";

/*
  Base client config for your application.
  Here you can define your base url, headers,
  timeouts and middleware used for each request.
*/
const client = axios.create({
  // baseURL: 'http://103.111.204.131/apiwebpbi/api/',
  baseURL: urlApi,

  // baseURL: "http://35.198.219.220:2121/alfaAPI/approval",

  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => {
    return !response.data.Error
      ? response.data
      : Promise.reject(response.data.Pesan);
  },
  (error) => {
    return Promise.reject(error);
  }
);

// const client = axios.create({
//   baseURL: API_URL,
//   timeout: 100000,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json"
//   },
// });

// // Custom middleware for requests (this one just logs the error).
// client.interceptors.request.use(config => config, (error) => {
//   console.log('Failed to make request with error:');
//   console.log(error);
//   return Promise.reject(error);
// });

// // Custom middleware for responses (this one just logs the error).
// client.interceptors.response.use(response => response, (error) => {
//   console.log('Request got response with error:');
//   console.log(error);
//   return Promise.reject(error);
// });

export default client;
