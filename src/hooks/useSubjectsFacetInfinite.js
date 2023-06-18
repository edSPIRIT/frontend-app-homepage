import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

const useSubjectsFacetInfinite = (searchString, inView) => {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchString);
  const [subjectsFilterItems, setSubjectsFilterItems] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchValue(searchString);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchString]);

  const fetchSubjectsFacet = async ({ pageParam = 1 }) => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/subject-list/?page=${pageParam}&has-courses-count=true&title=${debouncedSearchValue}`,
    );

    if (!apiRes.ok) {
      throw new Error('Failed to fetch subjects facet');
    }

    return apiRes.json();
  };
  const {
    data, isLoading, fetchNextPage, hasNextPage, isFetching,
  } = useInfiniteQuery(
    ['SubjectsFacet', debouncedSearchValue],
    ({ pageParam }) => fetchSubjectsFacet({ pageParam }),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.next && new URL(lastPage.next).searchParams.get('page');
        return nextPage ? parseInt(nextPage, 10) : false;
      },
    },
  );
  useEffect(() => {
    if (data?.pages) {
      setSubjectsFilterItems(data.pages.flatMap((page) => page.results));
    }
  }, [data]);
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return {
    subjectsFilterItems,
    loading: isLoading,
    isFetching,
  };
};
export default useSubjectsFacetInfinite;
