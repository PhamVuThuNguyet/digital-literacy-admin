import axiosClient from './axiosClient';

const API_ROUTE = 'words';

export const getWordGame = (params = {}) => {
  return axiosClient.get(`${API_ROUTE}`, {
    params,
  });
};

export const createWordGame = (data) => {
  return axiosClient.post(API_ROUTE, data);
};

export const updateWordGame = (id, data) => {
  return axiosClient.patch(`${API_ROUTE}/${id}`, data);
};
