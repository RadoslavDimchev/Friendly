import { store } from "index";

export const useIsAuth = () => {
  const token = store.getState().token;
  const isAuth = Boolean(token);
  return isAuth;
};
