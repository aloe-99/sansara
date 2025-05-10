import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, redirectPath = '../signin', children }) => {
  if (!loggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute

