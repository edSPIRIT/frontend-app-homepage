import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetInstructorCourses = (courseId) => {
  console.log('courseId', courseId);

  const fetchInstructorCourses = async () => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/instructor-list/?page=1&course_id=${courseId}`,
      {
        enabled: !!courseId,
      },
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery(
    'InstructorCourses',
    fetchInstructorCourses,
  );
  return {
    InstructorCourses: data,
    loading: isLoading,
  };
};

export default useGetInstructorCourses;
