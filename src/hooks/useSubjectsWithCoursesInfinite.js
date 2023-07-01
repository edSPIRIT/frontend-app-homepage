/* eslint-disable no-restricted-syntax */
import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

const useSubjectsWithCoursesInfinite = () => {
  const [allResults, setAllResults] = useState([]);
  const fetchSubjectsWithCourses = async ({ pageParam = 1 }) => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/subject-list/?page=${pageParam}&with-courses=true`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };

  const {
    data, isLoading, fetchNextPage, hasNextPage, isFetching,
  } = useInfiniteQuery('subjectsWithCourses', fetchSubjectsWithCourses, {
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return parseInt(url.searchParams.get('page'), 10);
      }
      return false;
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      if (isFetching || !hasNextPage) {
        return;
      }
      if (
        window.innerHeight + window.scrollY
          >= document.documentElement.scrollHeight
        && hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, fetchNextPage, isFetching]);

  useEffect(() => {
    if (data?.pages) {
      const newResults = data.pages.flatMap((page) => page.results);
      setAllResults(newResults);
    }
  }, [data?.pages]);

  return {
    subjectsWithCourses: allResults,
    loading: isLoading,
    isFetching,
  };
};
export default useSubjectsWithCoursesInfinite;
