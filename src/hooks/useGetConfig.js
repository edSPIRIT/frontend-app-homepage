import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetConfig = () => {
  const fetchConfig = async ({ baseURL, instanceConfigAPIUrl }) => {
    const response = await fetch(`${baseURL}${instanceConfigAPIUrl}`);
    const result = await response.json();
    return JSON.parse(result)?.logo;
  };

  const { data, isLoading, isError } = useQuery(
    'headerLogo',
    () => fetchConfig({
      baseURL: getConfig().LMS_BASE_URL,
      instanceConfigAPIUrl: getConfig().AC_INSTANCE_CONFIG_API_URL,
    }),
    {
      enabled:
        !!getConfig().LMS_BASE_URL && !!getConfig().AC_INSTANCE_CONFIG_API_URL,
    },
  );

  return {
    headerLogo: data,
    loading: isLoading,
    isError,
  };
};
export default useGetConfig;