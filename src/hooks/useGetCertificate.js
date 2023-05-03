import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppContext } from '@edx/frontend-platform/react';
import { useContext } from 'react';
import { useQuery } from 'react-query';

const useGetCertificate = (courseInfo) => {
  const { authenticatedUser } = useContext(AppContext);

  const fetchCertificate = async () => {
    const url = `${getConfig().LMS_BASE_URL}/api/certificates/v0/certificates/${
      authenticatedUser?.username
    }/courses/${courseInfo?.course_details?.courseId}/`;
    const { data } = await getAuthenticatedHttpClient().get(url);
    // if (data.status === "downloadable") {
    //   throw new Error('fetch not ok');
    // }
    // if (status === 200) {
    //   window.location.href = data?.paymentURL;
    // }

    return data;
  };
  const { data, isLoading } = useQuery('Certificate', fetchCertificate, {
    enabled:
      courseInfo?.progress?.complete_count > 0
      && courseInfo?.progress?.incomplete_count === 0,
  });
  return {
    certificateData: data,
    loading: isLoading,
  };
};
export default useGetCertificate;
