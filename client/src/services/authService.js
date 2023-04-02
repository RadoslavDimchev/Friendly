import { post } from './requester';
const URL = '/auth';

export const register = async (data) => post(`${URL}/register`, data, true);

export const login = async (data) => post(`${URL}/login`, data);
