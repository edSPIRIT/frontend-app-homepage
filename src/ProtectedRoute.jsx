import { AppContext } from '@edx/frontend-platform/react';
import { useContext } from 'react';
import handleRedirect from './utils/handleRedirect';

const ProtectedRoute = ({ children }) => {
  const { authenticatedUser } = useContext(AppContext);

  if (!authenticatedUser) {
    handleRedirect();
  }
  return children;
};

export default ProtectedRoute;
