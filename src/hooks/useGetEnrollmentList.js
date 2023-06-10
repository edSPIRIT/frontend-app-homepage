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
    userCourseTitles: `${data?.results?.reduce(
      (acc, current) => `${acc}${current?.course_details?.course_name} `,
      '',
    )}`,
    userCourseIds: data?.results?.map((course) => course?.course_details?.course_id),
    userInprogressCourses: data?.results?.filter(
      (courseInfo) => courseInfo?.progress?.incomplete_count > 0,
    ),
    userCompletedCourses: data?.results?.filter(
      (courseInfo) => courseInfo?.progress?.complete_count > 0
        && courseInfo?.progress?.incomplete_count === 0,
    ),
    userCourses: data?.results?.slice(0, 5),
    loading: isLoading,
  };
};

export default useGetEnrollmentList;
