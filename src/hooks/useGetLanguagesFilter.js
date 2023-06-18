import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetLanguagesFilter = () => {
  const fetchLanguagesFilter = async () => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/languages-with-courses/`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery('LanguagesFilter', fetchLanguagesFilter);
  return {
    languagesFilter: data,
    loading: isLoading,
  };
};
export default useGetLanguagesFilter;
