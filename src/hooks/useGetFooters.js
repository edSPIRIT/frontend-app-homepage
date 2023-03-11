import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetFooters = () => {
  const fetchFooters = async () => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/footer-section/`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery('Footers', fetchFooters);
  return {
    footerData: data,
    loading: isLoading,
  };
};
export default useGetFooters;
