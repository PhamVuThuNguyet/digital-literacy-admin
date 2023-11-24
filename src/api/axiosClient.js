import axios from 'axios';
import { getAccessToken, getRefreshToken, setToken } from '@utils/localStorage';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}/api/v1`,
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      try {
        const refreshToken = getRefreshToken();
        const decodedToken = decodedJwt(refreshToken);

        if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
          store.dispatch(logout());
        }

        // const { data } = await instance.post(`/auth/refresh-token`, {
        //   refreshToken: refreshToken,
        // });
        setToken(data);
        instance.defaults.headers.common['Authorization'] =
          'Bearer ' + refreshToken;
        return instance(originalRequest);
      } catch (e) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
