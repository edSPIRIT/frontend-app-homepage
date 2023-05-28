import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useSearchSuggestions = (searchSuggestionValue) => {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(
    searchSuggestionValue,
  );
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchValue(searchSuggestionValue);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchSuggestionValue]);
  const fetchSearchSuggestionsResults = async () => {
    const url = `${
      getConfig().LMS_BASE_URL
    }/admin-console/api/full-course-discovery/`;
    const { data, status } = await getAuthenticatedHttpClient().post(url, {
      search_string: debouncedSearchValue,
    });
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    return data;
  };

  const { data, isLoading } = useQuery(
    ['SearchSuggestionsResults', debouncedSearchValue],
    fetchSearchSuggestionsResults,
    { enabled: !!debouncedSearchValue },
  );

  return {
    searchSuggestionsResults: data?.results,
    isLoading,
  };
};
export default useSearchSuggestions;
