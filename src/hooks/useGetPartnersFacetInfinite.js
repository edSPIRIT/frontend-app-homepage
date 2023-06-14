import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

const useGetPartnersFacetInfinite = (searchString, inView) => {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchString);
  const [partnersFilterItems, setPartnersFilterItems] = useState([]);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchValue(searchString);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchString]);
  const fetchPartnersFacet = async ({ pageParam = 1 }) => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/partner-list/?page=${pageParam}&ordering=recent&has-courses-count=true&name=${debouncedSearchValue}`,
    );

    if (!apiRes.ok) {
      throw new Error('Failed to fetch partners facet');
    }

    return apiRes.json();
  };

  const {
    data, isLoading, fetchNextPage, hasNextPage, isFetching,
  } = useInfiniteQuery(
    ['PartnersFacet', debouncedSearchValue],
    ({ pageParam }) => fetchPartnersFacet({ pageParam }),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.next && new URL(lastPage.next).searchParams.get('page');
        return nextPage ? parseInt(nextPage, 10) : false;
      },
    },
  );
  useEffect(() => {
    if (data?.pages) {
      setPartnersFilterItems(data.pages.flatMap((page) => page.results));
    }
  }, [data]);
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return {
    partnersFilterItems,
    loading: isLoading,
    isFetching,
  };
};
export default useGetPartnersFacetInfinite;
