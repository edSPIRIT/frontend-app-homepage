import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const useSearchSuggestions = () => {
  const searchSuggestionValue = useSelector((state) => state.search.searchSuggestionValue);
  const fetchSearchResults = async () => {
    const url = `${
      getConfig().LMS_BASE_URL
    }/admin-console/api/full-course-discovery/`;
    const { data, status } = await getAuthenticatedHttpClient().post(url, {
      search_string: searchSuggestionValue,
    });
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    return data;
  };
  const { data, isLoading } = useQuery(
    ['SearchResults', searchSuggestionValue],
    fetchSearchResults,
    { enabled: !!searchSuggestionValue },
  );

  return {
    searchSuggestionsResults: data?.results,
    isLoading,
  };
};
export default useSearchSuggestions;
