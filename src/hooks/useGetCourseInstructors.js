import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetInstructorCourses = (courseId) => {
  const fetchInstructorCourses = async ({ queryKey }) => {
    const id = queryKey[1];
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/instructor-list/?page=1&course_id=${id}`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery(
    ['InstructorCourses', courseId],
    fetchInstructorCourses,
    {
      enabled: !!courseId,
    },
  );
  return {
    InstructorCourses: data,
    loading: isLoading,
  };
};

export default useGetInstructorCourses;
