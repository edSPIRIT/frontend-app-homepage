import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetTopRecentCourses = () => {
  const [topRecentCoursesData, setTopRecentCoursesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTopCoursesData = async () => {
    try {
      setLoading(true);
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/admin-console/api/top-recent-courses`,
      );
      const Data = await Res.json();
      setTopRecentCoursesData(Data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  useEffect(() => {
    getTopCoursesData();
  }, []);
  return {
    recentCourses: topRecentCoursesData.recent_courses,
    topCourses: topRecentCoursesData.top_courses,
    loading,
  };
};
export default useGetTopRecentCourses;
