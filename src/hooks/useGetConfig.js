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
  const faviconVersion = Date.now(); // Update this version number when the favicon updates
  const favicon = data?.favicon
    ? `${data.favicon}?v=${faviconVersion}`
    : faviconPlaceholder;
  return {
    headerLogo: data?.logo,
    hasBilling: data?.has_billing,
    favicon,
    platformName: data?.platform_name,
    gtm: data?.gtm,
    useTPAOnly: data?.use_tpa_only,
    TPAQueryparam: data?.tpa_queryparam,
    loading: isLoading,
    isError,
  };
};
export default useGetConfig;
