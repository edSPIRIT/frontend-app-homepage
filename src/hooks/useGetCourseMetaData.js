import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetCourseMetaData = (courseId) => {
  const fetchCourseMetaData = async ({ queryKey }) => {
    const id = queryKey[1];
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/course-metadata/${id}/`,
    );

    if (!apiRes.ok) {
      throw new Error('api/course-metadata fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery(
    ['CourseMetaData', courseId],
    fetchCourseMetaData,
    {
      enabled: !!courseId,
    },
  );

  return {
    courseMetaData: data,
    loading: isLoading,
  };
};
export default useGetCourseMetaData;
