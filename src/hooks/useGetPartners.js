import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetPartners = () => {
  const initialPartners = {
    count: null,
    current_page: null,
    next: null,
    num_pages: null,
    previous: null,
    results: [],
    start: null,
    total_courses: null,
    total_enrollments: null,
  };
  const fetchPartners = async () => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/partner-list/`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery('Partners', fetchPartners);
  return {
    count: data?.count,
    partnersData: data?.results,
    num_pages: data?.num_pages,
    topPartners: data?.results.filter((org) => org.featured).slice(0, 4),
    loading: isLoading,
  };
};
export default useGetPartners;
