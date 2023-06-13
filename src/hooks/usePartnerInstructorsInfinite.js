import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

const usePartnerInstructorsInfinite = (partner) => {
  const [partnerInstructors, setPartnerInstructors] = useState([]);
  const fetchPartnerInstructors = async ({ pageParam = 1 }) => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/partner-instructors/${partner}/?page_size=4&page=${pageParam}`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };

  const {
    data, isLoading, fetchNextPage, hasNextPage, isFetching,
  } = useInfiniteQuery('PartnerInstructors', fetchPartnerInstructors, {
    enabled: !!partner,
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
      const allResults = data.pages.flatMap((page) => page.results);
      setPartnerInstructors(allResults);
    }
  }, [data?.pages]);

  return {
    partnerInstructors,
    loading: isLoading,
    isFetching,
  };
};

export default usePartnerInstructorsInfinite;
