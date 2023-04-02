import { store } from "index";

const BASE_URL = `http://localhost:${
  process.env.REACT_APP_URL_PORT || process.env.REACT_APP_URL_PORT_ALTERNATIVE
}`;

const request = async (method, url, data) => {
  const options = {
    method,
    headers: {},
  };

  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const token = store.getState().token;
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, options);
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const patch = request.bind(null, 'PATCH');
export const del = request.bind(null, 'DELETE');
