import { patch } from './requester';

const URL = '/posts';

export const likePost = async (postId, data) =>
  patch(`${URL}/${postId}/like`, data);
