import { get, patch } from './requester';
const URL = '/users';

export const getAllUserFriends = async (userId) => get(`${URL}/${userId}/friends`);

export const getById = async (userId) => get(`${URL}/${userId}`);

export const patchFriend = async (userId, friendId) =>
  patch(`${URL}/${userId}/${friendId}`);
