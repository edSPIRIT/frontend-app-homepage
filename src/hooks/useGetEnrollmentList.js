import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';

const useGetEnrollmentList = () => {
  const fetchEnrollmentList = async () => {
    const { data, status } = await getAuthenticatedHttpClient().get(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/openedx/api/enrollment-list/`,
    );
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    return data;
  };
  const { data, isLoading } = useQuery('EnrollmentList', fetchEnrollmentList);
  return {
    coursesEnrollment: data,
    loading: isLoading,
  };
};

export default useGetEnrollmentList;
