import { getConfig } from '@edx/frontend-platform';

const handleRedirect = () => {
  // Get the URL of the login page in the other project
  const loginUrl = `${getConfig().LOGIN_URL}`;

  // Set the URL parameters for the redirect back to your home page after login
  const redirectParams = `?next=${encodeURIComponent(window.location.href)}`;

  // Redirect the user to the login page with the redirect parameters
  window.location.href = `${loginUrl}${redirectParams}`;
};
export default handleRedirect;

export const handleLogout = () => {
  const logoutUrl = `${getConfig().LMS_BASE_URL}/logout`;
  const redirectParams = `?next=${encodeURIComponent(window.location.href)}`;
  window.location.href = `${logoutUrl}${redirectParams}`;
};
