import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const useSearchResults = () => {
  const searchQueryValue = useSelector((state) => state.search.searchQueryValue);
  const fetchSearchResults = async () => {
    const url = `${
      getConfig().LMS_BASE_URL
    }/admin-console/api/full-course-discovery/`;
    const { data, status } = await getAuthenticatedHttpClient().post(url, {
      search_string: searchQueryValue,
    });
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    return data;
  };
  const { data, isLoading } = useQuery(
    ['SearchResults', searchQueryValue],
    fetchSearchResults,
    { enabled: !!searchQueryValue },
  );

  return {
    searchResults: data?.results,
    searchResultsCount: data?.total,
    isLoading,
  };
};
export default useSearchResults;
