import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { IAllCoursesPagination } from './interfaces/APIResponsesInterfaces';

const useGetAllCourses = () => {
  const sortState = useSelector((state: any) => state.sortAllCourses.value);
  const searchPage = useSelector((state: any) => state.searchPage.page);
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

  const { isLoading, data, isFetching } = useQuery<IAllCoursesPagination>({
    queryKey: ['AllCourses', searchPage, sortState],
    queryFn: () => fetchAllCourses(searchPage),
    keepPreviousData: true,
  });
  return {
    allCoursesData: data,
    loading: isLoading && isFetching,
  };
};
export default useGetAllCourses;
