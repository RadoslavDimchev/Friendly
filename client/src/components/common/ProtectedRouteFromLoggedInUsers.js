import { useIsAuth } from 'hooks/useIsAuth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouteFromLoggedInUsers = () => {
  const isAuth = useIsAuth();

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteFromLoggedInUsers;
