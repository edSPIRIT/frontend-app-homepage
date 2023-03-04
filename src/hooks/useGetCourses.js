import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';

const useGetCourses = () => {
  const fetchCourses = async () => {
    const client = getAuthenticatedHttpClient();
    const baseUrl = getConfig().LMS_BASE_URL;
    const response = await client.get(`${baseUrl}/api/courses/v1/courses/`);

    return response.data.results;
  };
  const { data, isLoading } = useQuery('Courses', fetchCourses);

  return {
    courses: data,
    loading: isLoading,
    courseTitles: `${data?.reduce(
      (acc, current) => `${acc}${current.name} `,
      '',
    )}`,
  };
};
export default useGetCourses;
