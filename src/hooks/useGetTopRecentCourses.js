import { getConfig } from '@edx/frontend-platform';
// import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useGetTopRecentCourses = () => {
  // const [topRecentCoursesData, setTopRecentCoursesData] = useState([]);
  // const [loading, setLoading] = useState(false);
  const fetchTopRecentCourses = async () => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/top-recent-courses/`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery('TopRecentCourses', fetchTopRecentCourses);
  // const getTopCoursesData = async () => {
  //   try {
  //     setLoading(true);
  //     const Res = await fetch(
  //       `${getConfig().LMS_BASE_URL}/admin-console/api/top-recent-courses/`,
  //     );
  //     const Data = await Res.json();
  //     setTopRecentCoursesData(Data);
  //     setLoading(false);
  //   } catch (e) {
  //     setLoading(false);
  //     console.error(e);
  //   }
  // };
  // useEffect(() => {
  //   getTopCoursesData();
  // }, []);
  const customCount = (coursesData) => {
    if (coursesData?.length >= 4 && coursesData?.length < 8) {
      return coursesData?.slice(0, 4);
    }
    if (coursesData?.length >= 8) {
      return coursesData?.slice(0, 8);
    }
    return coursesData;
  };
  return {
    recentCourses: customCount(data?.recent_courses),
    topCourses: customCount(data?.top_courses),
    loading: isLoading,
  };
};
export default useGetTopRecentCourses;
