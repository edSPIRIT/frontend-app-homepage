import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetCourseMetaData = (courseId) => {
  const fetchCourseMetaData = async () => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/course-metadata/${courseId}/`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery('CourseMetaData', fetchCourseMetaData);

  return {
    courseMetaData: data,
    loading: isLoading,
  };
};
export default useGetCourseMetaData;
