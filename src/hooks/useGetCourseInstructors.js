import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetInstructorCourses = (courseSlug) => {
  const fetchInstructorCourses = async (course_slug) => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/course-metadata/${course_slug}/instructors`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery(
    ['InstructorCourses', courseSlug],
    () => fetchInstructorCourses(courseSlug),
    {
      enabled: !!courseSlug,
    },
  );
  return {
    instructors: data,
    loading: isLoading,
  };
};

export default useGetInstructorCourses;
