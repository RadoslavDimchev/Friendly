import { get, patch } from './requester';
const URL = '/users';

export const getAll = async () => get(URL);

export const getById = async (userId) => get(`${URL}/${userId}`);

export const patchFriend = async (userId, friendId) =>
  patch(`${URL}/${userId}/${friendId}`);
