import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';

const useCheckPrerequisiteStatus = (courseSlug) => {
  const fetchPreReqCourseStatus = async ({ queryKey }) => {
    const slug = queryKey[1];

    const url = `${
      getConfig().LMS_BASE_URL
    }/admin-console/api/pre-req-status/${slug}/`;
    const { data, status } = await getAuthenticatedHttpClient().get(url);
    if (status !== 200) {
      throw new Error('PreReqCourseStatus fetch not ok');
    }
    return data;
  };

  const { data, isLoading } = useQuery(
    ['PreReqCourseStatus', courseSlug],
    fetchPreReqCourseStatus,
    {
      enabled: !!courseSlug,
    },
  );
  return {
    isCompletePreReq: data?.fulfilled,
    loading: isLoading,
  };
};
export default useCheckPrerequisiteStatus;
