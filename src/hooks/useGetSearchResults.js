import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const useGetSearchResults = () => {
  const searchQuery = useSelector((state) => state.searchQuery.value);
  const fetchSearchResults = async () => {
    const url = `${
      getConfig().LMS_BASE_URL
    }/admin-console/api/full-course-discovery/`;
    const { data, status } = await getAuthenticatedHttpClient().post(url, {
      search_string: searchQuery,
    });
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    return data;
  };
  const { data, isLoading } = useQuery(
    ['SearchResults', searchQuery],
    fetchSearchResults,
    { enabled: !!searchQuery },
  );

  return {
    searchResults: data?.results,
    searchResultsCount: data?.total,
    isLoading,
  };
};
export default useGetSearchResults;
