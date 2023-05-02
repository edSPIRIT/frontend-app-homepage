import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';

const useGetActiveLangs = () => {
  const fetchActiveLangs = async () => {
    const client = getAuthenticatedHttpClient();
    const baseUrl = getConfig().LMS_BASE_URL;
    const response = await client.get(`${baseUrl}/admin-console/api/active-langs/`);

    return JSON.parse(response.data);
  };
  const { data, isLoading } = useQuery('ActiveLangs', fetchActiveLangs);

  return {
    activeLangs: data,
    loading: isLoading,
  };
};
export default useGetActiveLangs;
