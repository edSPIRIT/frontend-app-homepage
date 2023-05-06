import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';

const useGetEnrollmentList = () => {
  const fetchEnrollmentList = async () => {
    const { data, status } = await getAuthenticatedHttpClient().get(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/openedx/api/enrollment-list/?ordering=recent`,
    );
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    return data;
  };
  const { data, isLoading } = useQuery('EnrollmentList', fetchEnrollmentList);
  return {
    coursesEnrollment: data,
    courseTitles: `${data?.reduce(
      (acc, current) => `${acc}${current?.course_details?.course_name} `,
      '',
    )}`,
    courseIds: data?.map((course) => course?.course_details?.course_id),
    loading: isLoading,
  };
};

export default useGetEnrollmentList;
