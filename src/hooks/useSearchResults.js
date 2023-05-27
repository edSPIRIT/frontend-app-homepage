import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { removeEmptyFilters } from '../utils/cleanedFilters';
import { isObjectEmpty } from '../utils/isObjectEmpty';

const useSearchResults = () => {
  const filters = useSelector(
    (state) => state.searchFilters,
  );

  const cleanedFilters = removeEmptyFilters(filters);
  const fetchSearchResults = async (cleanFilters) => {
    const url = `${
      getConfig().LMS_BASE_URL
    }/admin-console/api/full-course-discovery/`;
    const { data, status } = await getAuthenticatedHttpClient().post(url, cleanFilters);
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    return data;
  };
  const { data, isLoading, error } = useQuery(
    ['SearchResults', cleanedFilters],
    () => fetchSearchResults(cleanedFilters),
    { enabled: !isObjectEmpty(cleanedFilters) },
  );
  console.log('filters:', filters);
  console.log('cleanedFilters:', cleanedFilters);
  console.log('data:', data);
  console.log('error:', error);
  return {
    searchResults: data?.results,
    searchResultsCount: data?.total,
    isLoading,
    data,
  };
};
export default useSearchResults;
