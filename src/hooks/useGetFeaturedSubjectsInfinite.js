/* eslint-disable no-restricted-syntax */
import { getConfig } from '@edx/frontend-platform';
import { useMediaQuery } from '@edx/paragon';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

const useGetFeaturedSubjectsInfinite = () => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const [featuredSubjects, setFeaturedSubjects] = useState();
  const [featuredSubjectsWithCourses, setFeaturedSubjectsWithCourses] = useState();

  const fetchFeaturedSubjects = async ({ pageParam = 1 }) => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/popular-subject-list/?page_size=15&page=${pageParam}`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };

  const {
    data, isLoading, fetchNextPage, hasNextPage, isFetching,
  } = useInfiniteQuery('FeaturedSubjects', fetchFeaturedSubjects, {
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return parseInt(url.searchParams.get('page'), 10);
      }
      return false;
    },
  });
  const getFeaturedSlices = (items, isMob) => {
    if (!items) {
      return { featuredSubjects: [], featuredSubjectsWithCourses: [] };
    }

    const mobileSlices = [
      { condition: (len) => len >= 3 && len < 6, start: 3 },
      { condition: (len) => len > 6, start: 6 },
    ];

    const desktopSlices = [
      { condition: (len) => len >= 10, start: 10 },
      { condition: (len) => len < 10 && len > 5, start: 5 },
    ];

    const slices = isMob ? mobileSlices : desktopSlices;

    for (const slice of slices) {
      if (slice.condition(items.length)) {
        return {
          featuredSubs: items.slice(0, slice.start),
          featuredSubsWithCourses: items.slice(slice.start),
        };
      }
    }

    return { featuredSubjects: items, featuredSubjectsWithCourses: [] };
  };
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
      const allResults = data.pages.flatMap((page) => page.results);

      const { featuredSubs, featuredSubsWithCourses } = getFeaturedSlices(
        allResults,
        isMobile,
      );
      setFeaturedSubjects(featuredSubs);
      setFeaturedSubjectsWithCourses(featuredSubsWithCourses);
    }
  }, [data?.pages, isMobile]);

  return {
    featuredSubjects,
    featuredSubjectsWithCourses,
    loading: isLoading,
    isFetching,
  };
};
export default useGetFeaturedSubjectsInfinite;
