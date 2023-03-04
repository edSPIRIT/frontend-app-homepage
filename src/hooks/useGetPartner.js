/* eslint-disable react-hooks/exhaustive-deps */
import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetPartner = (partner) => {
  const initialPartner = {
    organization: {
      id: 0,
      created: '',
      modified: '',
      name: '',
      short_name: '',
      description: '',
      logo: '',
      active: false,
    },
    header: '',
    featured: false,
    courses_count: 0,
    created: '',
  };

  const fetchPartner = async () => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/partner/${partner}/`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery('Partner', fetchPartner, {
    enabled: !!partner,
  });

  return {
    partnerData: data,
    loading: isLoading,
  };
};
export default useGetPartner;
