import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useGetPartnersSuggestions = (searchString) => {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchString);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchValue(searchString);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchString]);
  const fetchPartnersFaset = async (query) => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/partner-list/?has-courses-count=true&name=${query}`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { isLoading, data } = useQuery({
    queryKey: ['PartnersSuggestionsFacet', debouncedSearchValue],
    queryFn: () => fetchPartnersFaset(debouncedSearchValue),
    enabled: !!debouncedSearchValue,
    keepPreviousData: true,
  });
  return {
    partnersSuggestionsResults: data?.results,
    loading: isLoading,
  };
};
export default useGetPartnersSuggestions;
