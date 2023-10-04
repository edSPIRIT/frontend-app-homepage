import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { removeEmptyFilters } from '../utils/cleanedFilters';

const useSearchResults = (page = 0) => {
  const filters = useSelector((state) => state.searchFilters);
  const sortState = useSelector((state) => state.sortSearchSlice.value);
  const cleanedFilters = removeEmptyFilters(filters);

  const fetchSearchResults = async (cleanFilters, pageNum = 0) => {
    const url = `${
      getConfig().LMS_BASE_URL
    }/admin-console/api/full-course-discovery/?page_size=12&page_index=${
      pageNum - 1
    }&sort=${sortState}`;
    const { data, status } = await getAuthenticatedHttpClient().post(
      url,
      cleanFilters
    );
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    return data;
  };
  const { data, isLoading } = useQuery(
    ['SearchResults', cleanedFilters, page, sortState],
    () => fetchSearchResults([], page)
  );

  return {
    searchResults: data?.results,
    searchResultsCount: data?.total,
    isLoading,
  };
};
export default useSearchResults;
