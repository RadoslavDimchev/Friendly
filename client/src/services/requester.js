import { store } from 'index';
import { setLogout } from 'state';

const request = async (method, url, data, isFormData) => {
  const options = {
    method,
    headers: {},
  };

  if (isFormData) {
    options.body = data;
  } else if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const token = store.getState().token;
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${url}`,
      options
    );

    if (response.status === 204) {
      return response;
    }

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 403) {
        store.dispatch(setLogout());
      }
      throw new Error(result.message || result.error);
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const patch = request.bind(null, 'PATCH');
export const del = request.bind(null, 'DELETE');
