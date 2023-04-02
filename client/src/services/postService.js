import { del, get, patch } from './requester';

const URL = '/posts';

export const getById = async (postId) => get(`${URL}/${postId}`);

export const like = async (postId, data) =>
  patch(`${URL}/${postId}/like`, data);

export const deleteById = async (postId) => del(`${URL}/${postId}`);
