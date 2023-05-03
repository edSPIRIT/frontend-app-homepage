import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppContext } from '@edx/frontend-platform/react';
import { useContext } from 'react';
import { useQuery } from 'react-query';

const useGetCertificate = (courseInfo) => {
  const { authenticatedUser } = useContext(AppContext);
  console.log('courseInfo', courseInfo);
  const fetchCertificate = async ({ queryKey }) => {
    const id = queryKey[1];
    const url = `${getConfig().LMS_BASE_URL}/api/certificates/v0/certificates/${
      authenticatedUser?.username
    }/courses/${id}/`;
    const { data } = await getAuthenticatedHttpClient().get(url);
    return data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ['Certificate', courseInfo?.course_details?.course_id],
    queryFn: fetchCertificate,
    retry: (failureCount, error) => error.status !== 404,
  });
  return {
    certificateData: data,
    loading: isLoading,
  };
};
export default useGetCertificate;
