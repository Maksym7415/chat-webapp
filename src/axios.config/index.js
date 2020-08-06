/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import axios from 'axios';
import store from '../redux';
import { actionLogout } from '../redux/authorization/constants/actionConstants';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const LocalStorageService = (() => {
  let _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken({ accessToken, refreshToken }) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
  function _getAccessToken() {
    return localStorage.getItem('accessToken');
  }
  function _getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  function _clearToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();

const setAxios = () => {
  const setDeafults = (() => {
    axios.defaults.baseURL = 'http://localhost:8081/api';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common.accept = 'application/json';
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    axios.defaults.timeout = 10000;
  })();

  const localStorageService = LocalStorageService.getService();

  axios.interceptors.request.use(
    (config) => {
      const token = localStorageService.getAccessToken();
      if (token) {
        if (config.url === '/refreshToken') return config;
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  axios.interceptors.response.use((response) => {
    const { url } = response.config;
    if (url === '/checkVerificationCode') {
      const { accessToken, refreshToken } = response.data;
      LocalStorageService.setToken({ accessToken, refreshToken });
    }
    return response;
  }, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      if (isRefreshing) {
        return new Promise(((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        }).catch((err) => Promise.reject(err));
      }
      isRefreshing = true;
      const refreshToken = localStorageService.getRefreshToken();
      return new Promise((async (resolve, reject) => {
        try {
          const payload = await axios.post('/refreshToken', { refreshToken });
          if (payload.status === 200) {
            localStorageService.setToken({ accessToken: payload.accessToken, refreshToken: payload.refreshToken });
            axios.defaults.headers.common.Authorization = `Bearer ${localStorageService.getAccessToken()}`;
            processQueue(null, payload.accessToken);
            resolve(axios(originalRequest));
          }
        } catch (err) {
          processQueue(err, null);
          store.dispatch(actionLogout());
          reject(err);
        }
        isRefreshing = false;
      }));
    }

    return Promise.reject(error);
  });
};

export default setAxios;
