import { getConfig } from '@edx/frontend-platform';
import axios from 'axios';
import { useQuery } from 'react-query';

const useGetInstructorPopularCourses = (instructor) => {
  const fetchInstructorPopularCourses = async (ins) => {
    try {
      const response = await axios.get(
        `${
          getConfig().LMS_BASE_URL
        }/admin-console/api/popular-course-list/?instructor_slug=${ins}&target=instructor`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const { data, isLoading } = useQuery(
    ['InstructorPopularCourses', instructor],
    () => fetchInstructorPopularCourses(instructor),
    {
      enabled: !!instructor,
    },
  );

  return {
    instructorPopularCourses: data,
    loading: isLoading,
  };
};
export default useGetInstructorPopularCourses;
