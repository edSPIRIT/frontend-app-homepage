import { AppContext } from '@edx/frontend-platform/react';
import { useContext } from 'react';
import { useHistory } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const { authenticatedUser } = useContext(AppContext);
  const history = useHistory();

  if (!authenticatedUser) {
    history.replace('/');
  }
  return children;
};

export default ProtectedRoute;
