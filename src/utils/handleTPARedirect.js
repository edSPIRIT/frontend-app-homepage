import { getConfig } from '@edx/frontend-platform';


const handleTPARedirect = (loginUrl) => {

  // Set the URL parameters for the redirect back to your home page after login
  const redirectParams = `?next=${encodeURIComponent(
    document.referrer
  )}&origin=${window.location.origin}`;

  // Redirect the user to the login page with the redirect parameters
  window.location.href = `${loginUrl}${redirectParams}`;
};
export default handleTPARedirect;

