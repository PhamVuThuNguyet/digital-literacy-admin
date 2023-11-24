import axiosClient from './axiosClient';

const API_ROUTE = 'knowledge';

export const getKnowledge = (params = {}) => {
  return axiosClient.get(`${API_ROUTE}`, {
    params,
  });
};

export const createKnowledge = (data) => {
  return axiosClient.post(API_ROUTE, data);
};

export const updateKnowledge = (id, data) => {
  return axiosClient.patch(`${API_ROUTE}/${id}`, data);
};
