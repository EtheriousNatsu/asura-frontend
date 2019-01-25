import axios from 'axios'
import {
  baseUrl
} from './env'
import errorHandler from './errorHandler';
import store from '../store'

// 默认配置
axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 20000;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `Token ${store.state.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


export default async (url, data = {}, type = 'get') => {
  type = type.toLocaleLowerCase();
  if (type === 'get' || type === 'delete') {
    let dataStr = '';
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
    try {
      const response = await axios({
        method: type,
        url: url
      });
      return response.data;
    } catch (error) {
      errorHandler(error);
    }
  } else {
    try {
      const response = await axios({
        method: type,
        url: url,
        data: data
      });
      return response.data;
    } catch (error) {
      errorHandler(error);
    }
  }
}
