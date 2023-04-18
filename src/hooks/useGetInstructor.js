/* eslint-disable consistent-return */
import { getConfig } from '@edx/frontend-platform';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';

const useGetInstructor = (slug) => {
  const history = useHistory();

  const fetchInstructor = async ({ queryKey }) => {
    const id = queryKey[1];
    try {
      const apiRes = await axios.get(
        `${getConfig().LMS_BASE_URL}/admin-console/api/instructor/${id}/`,
      );
      return apiRes.data;
    } catch (err) {
      console.error(err);
      if (err.response.status === 404) {
        history.push('/404');
      }
    }
  };
  const { data, isLoading } = useQuery(['Instructor', slug], fetchInstructor, {
    enabled: !!slug,
  });

  return {
    InstructorData: data,
    loading: isLoading,
  };
};
export default useGetInstructor;
