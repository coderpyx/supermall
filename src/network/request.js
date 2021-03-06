import axios from 'axios'

export function request(config) {
  //1. 创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/z8',
    timeout:1000,
  })

  // 2. axios 的拦截器
  instance.interceptors.response.use(config => {
    return config;

  },err => {
    // console.log(err);
  })

  // 2.2响应拦截

  instance.interceptors.response.use( res => {
    return res
  },err => {
    // console.log(err);

  })

  // 3.发送真正的网络请求
  return instance(config)




}