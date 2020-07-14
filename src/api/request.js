import Axios from 'axios';
// 调用从cookie中获取用户信息的方法
import {GetUserCookie} from '@/common/UserCookie.js';
// 暴露开发环境
export const baseURL = "http://192.168.0.101:8088";
// 1.创建一个axios实例
const AxiosServe = Axios.create({
  baseURL: baseURL,
  timeout: 1000
})

// 请求拦截器
AxiosServe.interceptors.request.use((config) => {
  // 在发送之前打印config
  console.log('请求拦截器', config);

  // 设置token到请求头，发送给服务端
  const token = localStorage.getItem("token");
  if (token) {
    // 增加一个名为Authorization的请求头，请求头中参数为token
    config.headers.common.Authorization = 'Bear'+token;
  }
  return config;  // 对config处理完后返回，下一步将向后端发送请求
}, (err) => {
  // 对请求错误做出动作
  return Promise.reject(err);
})

// 响应拦截器
AxiosServe.interceptors.response.use((response) => {
  // 响应时做什么动作
  console.log('响应拦截器', response);
  return response.data;
}, (err) => {
  // 对响应的错误做什么动作
  return Promise.reject(err);
})
export default AxiosServe;
