import { getConfig } from "@edx/frontend-platform";
import { useQuery } from "react-query";

const useGetTPAURL = () => {
  const fetchTPAURL = async ({ baseURL, UseTPAAPIUrl }) => {
    const response = await fetch(`${baseURL}${UseTPAAPIUrl}`);
    const result = await response.json();
    return result;
  };

  const { data, isLoading, isError } = useQuery(
    "headerLogo",
    () =>
      useGetTPAURL({
        baseURL: getConfig().LMS_BASE_URL,
        instanceConfigAPIUrl: getConfig().AC_TPA_URL_API_URL,
      }),
    {
      enabled:
        !!getConfig().LMS_BASE_URL && !!getConfig().AC_TPA_URL_API_URL,
    }
  );
  return {
    TPAURL: data?.tpa_url,
    loading: isLoading,
    isError,
  };
};
export default useGetTPAURL;
