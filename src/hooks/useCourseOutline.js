import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';

const useCourseOutline = (courseId) => {
  const fetchCourseOutline = async ({ queryKey }) => {
    const id = queryKey[1];
    const url = `${getConfig().LMS_BASE_URL}/api/course_home/outline/${id}/`;
    const { data, status } = await getAuthenticatedHttpClient().get(url);
    if (status !== 200) {
      throw new Error('CourseOutline fetch not ok');
    }
    return data;
  };

  const { data, isLoading } = useQuery(
    ['CourseOutline', courseId],
    fetchCourseOutline,
    {
      enabled: !!courseId,
    },
  );
  return {
    resumeCourseUrl: data?.resume_course?.url,
    hasVisitedCourse: data?.resume_course?.has_visited_course,
    certUrl: data?.cert_data?.cert_web_view_url,
    loading: isLoading,
  };
};
export default useCourseOutline;
