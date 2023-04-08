import { useIsAuth } from 'hooks/useIsAuth';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useParams } from 'react-router-dom';

const ProtectedRouteForPostOwner = () => {
  const { postId } = useParams();
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  const isAuth = useIsAuth();
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  const post = posts.find((p) => p._id === postId);
  const isOwner = post.userId === user._id;

  if (!isOwner) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteForPostOwner;
