import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../PrivateRouter/AuthPrivate';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-90">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
        <p className="text-lg font-semibold text-white drop-shadow-lg">
          Loading, please wait...
        </p>
      </div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
