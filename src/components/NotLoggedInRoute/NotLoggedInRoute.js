import { Navigate, Outlet } from 'react-router-dom';

const NotLoggedInRoute = ({ loggedIn, redirectPath = './projects', children }) => {
  if (loggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default NotLoggedInRoute