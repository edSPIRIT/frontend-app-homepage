import { getConfig } from '@edx/frontend-platform';


const handleTPARedirect = (TPAQueryparam) => {

  // Get the URL of the login page in the other project
  const loginUrl = `${getConfig().LOGIN_URL}`;

  // Set the URL parameters for the redirect back to your home page after login
  const redirectParams = `next=${encodeURIComponent(
    document.referrer
  )}&origin=${window.location.origin}`;

  // Redirect the user to the login page with the redirect parameters
  window.location.href = `${loginUrl}${TPAQueryparam}&${redirectParams}`;
};
export default handleTPARedirect;

