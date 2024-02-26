import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';

const useGetTopRecentCourses = (sortState) => {
  // const isTablet = useMediaQuery({ maxWidth: '1351px' });

  const fetchTopRecentCourses = async () => {
    const url = `${
      getConfig().LMS_BASE_URL
    }/admin-console/api/full-course-discovery/?page_size=8&page_index=0&sort=${sortState}`;
    const { data, status } = await getAuthenticatedHttpClient().post(url, '');
    if (status !== 200) {
      throw new Error('Failed to fetch top recent courses');
    }

    return data;
  };
  const { data, isLoading } = useQuery(
    ['topRecentCourses', sortState],
    fetchTopRecentCourses,
    {
      staleTime: 2 * (60 * 1000),
    },
  );

  // const customCount = (coursesData) => {
  //   if (isTablet) {
  //     if (coursesData?.length >= 3 && coursesData?.length < 6) {
  //       return coursesData.slice(0, 3);
  //     }
  //     if (coursesData?.length >= 6) {
  //       return coursesData.slice(0, 6);
  //     }
  //     return [];
  //   }
  //   if (coursesData?.length >= 4 && coursesData?.length < 8) {
  //     return coursesData.slice(0, 4);
  //   }
  //   if (coursesData?.length >= 8) {
  //     return coursesData.slice(0, 8);
  //   }
  //   return [];
  // };

  return {
    topRecentCourses: data?.results,
    loading: isLoading,
  };
};
export default useGetTopRecentCourses;
