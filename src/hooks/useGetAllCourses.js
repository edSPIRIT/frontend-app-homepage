import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const useGetAllCourses = (page = 1) => {
  console.log('hi');
  const sortState = useSelector((state) => state.sortAllCourses.value);
  const fetchAllCourses = async (pageNum = 1) => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/course-list/?page=${pageNum}&ordering=${sortState}`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };

  const { isLoading, data } = useQuery({
    queryKey: ['AllCourses', page, sortState],
    queryFn: () => fetchAllCourses(page),
    keepPreviousData: true,
  });
  return {
    allCoursesData: data,
    loading: isLoading,
  };
};
export default useGetAllCourses;
