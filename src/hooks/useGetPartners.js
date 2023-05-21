import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const useGetPartners = (page = 1) => {
  const sortState = useSelector((state) => state.sortPartners.value);

  const fetchPartners = async (pageNum = 1) => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/partner-list/?page=${pageNum}&ordering=${sortState}`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ['Partners', page, sortState],
    queryFn: () => fetchPartners(page),
    keepPreviousData: true,
  });
  return {
    count: data?.count,
    partnersData: data?.results,
    numPages: data?.num_pages,
    partnersMetaData: data?.metadata,
    loading: isLoading,
    isFetching,
  };
};
export default useGetPartners;
