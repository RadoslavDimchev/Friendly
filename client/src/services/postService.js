import { del, get, patch, post } from './requester';
const URL = '/posts';

export const getAll = async () => get(URL);

export const getAllForUser = async (userId) => get(`${URL}/${userId}/posts`);

export const getById = async (postId) => get(`${URL}/${postId}`);

export const create = async (data) => post(URL, data, true);

export const deleteById = async (postId) => del(`${URL}/${postId}`);

export const like = async (postId, data) =>
  patch(`${URL}/${postId}/like`, data);

export const addComment = async (postId, data) =>
  patch(`${URL}/${postId}/comments`, data);

export const edit = async (postId, data) =>
  patch(`${URL}/${postId}/edit`, data, true);
