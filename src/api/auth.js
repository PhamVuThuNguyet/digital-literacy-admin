import axiosClient from './axiosClient';

const API_ROUTE = 'auth';

export const login = (data) => {
  return axiosClient.post(`${API_ROUTE}/login`, data);
};

export const register = (data) => {
  return axiosClient.post(`${API_ROUTE}/register`, data);
};
