/* eslint-disable consistent-return */
import { getConfig } from '@edx/frontend-platform';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

const useGetInstructorsFacetInfinite = (searchString, inView) => {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(
    searchString,
  );
  const [instructorsFilterItems, setInstructorsFilterItems] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchValue(searchString);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchString]);
  const fetchInstructors = async ({ pageParam = 1 }) => {
    try {
      const apiRes = await axios.get(
        `${
          getConfig().LMS_BASE_URL
        }/admin-console/api/instructor-list/?page=${pageParam}&search_query=${debouncedSearchValue}`,
      );
      return apiRes.data;
    } catch (err) {
      console.error(err);
    }
  };

  const {
    data, isLoading, fetchNextPage, hasNextPage, isFetching,
  } = useInfiniteQuery(
    ['InstructorsFacet', debouncedSearchValue],
    ({ pageParam }) => fetchInstructors({ pageParam }),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.next && new URL(lastPage.next).searchParams.get('page');
        return nextPage ? parseInt(nextPage, 10) : false;
      },
    },
  );
  useEffect(() => {
    if (data?.pages) {
      setInstructorsFilterItems(data.pages.flatMap((page) => page.results));
    }
  }, [data]);
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);
  return {
    instructorsFilterItems,
    loading: isLoading,
    isFetching,
  };
};
export default useGetInstructorsFacetInfinite;
