import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const sendAccountActivationEmail = async () => {
  const url = `${getConfig().LMS_BASE_URL}/api/send_account_activation_email`;
  const { data, status } = await getAuthenticatedHttpClient().post(url);
  if (status !== 200) {
    throw new Error('Failed to fetch top recent courses');
  }
  return data;
};

export default sendAccountActivationEmail;
