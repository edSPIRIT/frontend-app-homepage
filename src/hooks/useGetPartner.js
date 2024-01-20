/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { getConfig } from '@edx/frontend-platform';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';

const useGetPartner = (partner) => {
  const history = useHistory();
  const fetchPartner = async ({ queryKey }) => {
    const id = queryKey[1];
    try {
      const apiRes = await axios.get(
        `${getConfig().LMS_BASE_URL}/admin-console/api/partner/${id}/`,
      );
      return apiRes.data;
    } catch (err) {
      if (err.response.status === 404) {
        history.push('/404');
      }
    }
  };
  const { data, isLoading } = useQuery(['Partner', partner], fetchPartner, {
    enabled: !!partner,
  });

  return {
    partnerData: data,
    loading: isLoading,
  };
};
export default useGetPartner;
