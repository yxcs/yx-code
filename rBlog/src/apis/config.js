// src/utils/request.js
import axios from "axios";
import qs from "qs";
import { message } from "antd";

// 创建axios实例
const service = axios.create({
  baseURL: "http://localhost:8080", // 从环境变量读取API地址
  timeout: 10000, // 超时时间
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 从本地存储获取token（假设存储在localStorage）
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // JWT标准格式
    }

    // 如果是GET请求，序列化参数
    if (config.method === "get") {
      config.paramsSerializer = (params) => {
        return qs.stringify(params, { arrayFormat: "brackets" });
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 根据后端约定自定义状态码逻辑（示例）
    if (res.code !== 0) {
      // 特殊错误处理（如token过期）
      if (res.code === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login"; // 跳转登录
      }
      message.error(res?.message)
      return Promise.reject(new Error(res.message || "Error"));
    }

    return res; // 直接返回核心数据（去除了axios包装）
  },
  (error) => {
    console.log(error)
    // 统一处理HTTP错误状态码
    let message = "";
    if (error.response) {
      message = `请求异常 (状态码: ${error.response.status})`;

      // 根据HTTP状态码细化提示
      switch (error.response.status) {
        case 400:
          message = "请求参数错误";
          break;
        case 401:
          message = "登录已过期，请重新登录";
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          break;
        case 403:
          message = "拒绝访问";
          break;
        case 404:
          message = "资源未找到";
          break;
        case 500:
          message = "服务器内部错误";
          break;
      }
    } else if (error.request) {
      message = "服务器未响应";
    } else {
      message = "请求发送失败";
    }

    // 可选：显示全局错误提示（如Element UI）
    // Message.error(message);

    return Promise.reject(new Error(message));
  }
);


export const request = (method, url, data = {}, params = {}) => {
  return service({
    method: method.toLowerCase(),
    url,
    data,
    params,
  });
};

// 快捷方法封装
export const get = (url, params) => request('get', url, {}, params);
export const post = (url, data) => request('post', url, data);
export const put = (url, data) => request('put', url, data);
export const del = (url, params) => request('delete', url, {}, params);

export default service;