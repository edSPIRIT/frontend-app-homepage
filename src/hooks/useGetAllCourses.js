import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetAllCourses = () => {
  const fetchAllCourses = async () => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/course-list/`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery('AllCourses', fetchAllCourses);
  return {
    allCoursesData: data?.results,
    loading: isLoading,
  };
};
export default useGetAllCourses;
