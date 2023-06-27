import { getConfig } from '@edx/frontend-platform';
import { useMediaQuery } from '@edx/paragon';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

const useGetTopRecentCourses = () => {
  const isTablet = useMediaQuery({ maxWidth: '1351px' });

  const fetchTopRecentCourses = async () => {
    const response = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/top-recent-courses/`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch top recent courses');
    }

    return response.json();
  };
  const { data, isLoading } = useQuery(
    'topRecentCourses',
    fetchTopRecentCourses,
    {
      staleTime: 2 * (60 * 1000),
    },
  );
  const customCount = (coursesData) => {
    if (isTablet) {
      if (coursesData?.length >= 3 && coursesData?.length < 6) {
        return coursesData.slice(0, 3);
      }
      if (coursesData?.length > 6) {
        return coursesData.slice(0, 6);
      }
      return [];
    }
    if (coursesData?.length >= 4 && coursesData?.length < 8) {
      return coursesData.slice(0, 4);
    }
    if (coursesData?.length >= 8) {
      return coursesData.slice(0, 8);
    }
    return [];
  };
  const { recentCourses, topCourses } = useMemo(
    () => ({
      recentCourses: customCount(data?.recent_courses),
      topCourses: customCount(data?.top_courses),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, isTablet],
  );
  return {
    recentCourses,
    topCourses,
    loading: isLoading,
  };
};
export default useGetTopRecentCourses;
