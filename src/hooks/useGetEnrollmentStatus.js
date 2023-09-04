import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppContext } from '@edx/frontend-platform/react';
import { useContext } from 'react';
import { useQuery } from 'react-query';

const useGetEnrollmentStatus = (courseId) => {
  const { authenticatedUser } = useContext(AppContext);
  const fetchEnrollmentStatus = async (course_id) => {
    const { data, status } = await getAuthenticatedHttpClient().get(
      `${getConfig().LMS_BASE_URL}/api/enrollment/v1/enrollment/${course_id}`,
    );
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    return data;
  };
  const { data, isLoading } = useQuery(
    ['enrollmentStatus', courseId],
    () => fetchEnrollmentStatus(courseId),
    {
      enabled: !!courseId && !!authenticatedUser,
    },
  );
  return {
    isEnrollmentActive: data?.is_active,
    loading: isLoading,
  };
};

export default useGetEnrollmentStatus;
