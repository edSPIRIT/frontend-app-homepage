import { getConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { authenticatedUser } = useContext(AppContext);

  if (!authenticatedUser) {
    window.location.href = getConfig().LOGIN_URL;
  }
  return children;
};

export default ProtectedRoute;
