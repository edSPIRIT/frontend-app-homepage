import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';
import faviconPlaceholder from '../assets/place-holders/favicon.svg';

const useGetConfig = () => {
  const fetchConfig = async ({ baseURL, instanceConfigAPIUrl }) => {
    const response = await fetch(`${baseURL}${instanceConfigAPIUrl}`);
    const result = await response.json();
    return result;
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

  const currentVersion = Date.now(); // This creates a unique timestamp
  const faviconVersion = currentVersion;
  const favicon = data?.favicon
    ? `${data.favicon}?v=${faviconVersion}`
    : faviconPlaceholder;

  // Add version parameter to headerLogo as well
  const headerLogo = data?.logo ? `${data.logo}?v=${currentVersion}` : null;

  return {
    headerLogo,
    hasBilling: data?.has_billing,
    favicon,
    platformName: data?.platform_name,
    gtm: data?.gtm,
    isTPAOnly: data?.use_tpa_only,
    TPAQueryparam: data?.tpa_queryparam,
    loading: isLoading,
    isError,
  };
};
export default useGetConfig;
