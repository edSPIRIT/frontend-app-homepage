import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const useGetPartnersFacet = (page = 1, searchString = '') => {
  const sortState = useSelector((state) => state.sortPartners.value);

  const fetchPartnersFaset = async (query, pageNum) => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/partner-list/?page=${pageNum}&ordering=${sortState}&has-courses-count=true&name=${query}`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ['PartnersFacet', searchString, page, sortState],
    queryFn: () => fetchPartnersFaset(searchString, page ?? 1),
    keepPreviousData: true,
  });
  return {
    partnersData: data?.results,
    count: data?.count,
    numPages: data?.num_pages,
    partnersMetaData: data?.metadata,
    loading: isLoading,
    isFetching,
  };
};
export default useGetPartnersFacet;
