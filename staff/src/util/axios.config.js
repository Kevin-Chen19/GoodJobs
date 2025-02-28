//设置axios拦截器
import axios from 'axios'
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  const {authorization} = response.headers;
  authorization && localStorage.setItem("token",authorization);
  return response;
}, function (error) {
  // Do something with response error
  const {status} = error.response;
  if(status === 401){
    window.location.href = "#/login";
  }
  return Promise.reject(error);
});