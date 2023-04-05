import { useIsAuth } from 'hooks/useIsAuth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouteFromGuest = () => {
  const isAuth = useIsAuth();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRouteFromGuest;
