/* eslint-disable react/prop-types */
import { AppContext } from '@edx/frontend-platform/react';
import { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router';
import { getConfig } from '@edx/frontend-platform';
import Loading from './components/shared/loading/Loading';

const ProtectedRoute = ({ children, ...rest }) => {
  const { authenticatedUser } = useContext(AppContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    if (!authenticatedUser) {
      // Redirect the user to the login page with a redirect parameter
      const loginUrl = `${getConfig().LOGIN_URL}`;
      const redirectUrl = encodeURIComponent(window.location.href);
      window.location.href = `${loginUrl}?next=${redirectUrl}`;

      // Set the state to prevent rendering the children
      setRedirectToLogin(true);
    }
  }, [authenticatedUser]);

  if (redirectToLogin) {
    return <Loading />;
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
