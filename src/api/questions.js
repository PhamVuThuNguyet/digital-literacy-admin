import axiosClient from './axiosClient';

const API_ROUTE = 'questions';

export const getAllQuestions = (params = {}) => {
  return axiosClient.get(`${API_ROUTE}`, {
    params,
  });
};

export const createQuestions = (data) => {
  return axiosClient.post(`${API_ROUTE}`, data);
};

export const updateQuestion = (id, data) => {
  return axiosClient.patch(`${API_ROUTE}/${id}`, data);
};

export const deleteQuestion = (id) => {
  return axiosClient.delete(`${API_ROUTE}/${id}`);
};
