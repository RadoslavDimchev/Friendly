import { useIsAuth } from 'hooks/useIsAuth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouteForLoggedInUsers = () => {
  const isAuth = useIsAuth();

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteForLoggedInUsers;
