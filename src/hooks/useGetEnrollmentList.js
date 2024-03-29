import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';

const useGetEnrollmentList = (courseStatus, page) => {
  const fetchEnrollmentList = async (progressStatus, pageNum = 1) => {
    const { data, status } = await getAuthenticatedHttpClient().get(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/openedx/api/enrollment-list/?ordering=recent&page=${pageNum}&progress=${progressStatus}`,
    );
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    return data;
  };
  const { data, isLoading } = useQuery(
    ['EnrollmentList', courseStatus, page],
    () => fetchEnrollmentList(courseStatus, page),
  );
  return {
    userCourses: data?.results,
    courseCount: data?.count,
    loading: isLoading,
  };
};

export default useGetEnrollmentList;
