import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetPartners = (page = 1) => {
  const fetchPartners = async (pageNum = 1) => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/partner-list/?page=${pageNum}`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  // const { data, isLoading } = useQuery('Partners', fetchPartners);
  const {
    isLoading, isError, error, data, isFetching, isPreviousData,
  } = useQuery({
    queryKey: ['Partners', page],
    queryFn: () => fetchPartners(page),
    keepPreviousData: true,
  });
  return {
    count: data?.count,
    partnersData: data?.results,
    numPages: data?.num_pages,
    topPartners: data?.results.filter((org) => org.featured).slice(0, 5),
    loading: isLoading,
    isFetching,
  };
};
export default useGetPartners;
