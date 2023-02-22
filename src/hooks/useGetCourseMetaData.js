import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetCourseMetaData = (courseId) => {
  const [courseMetaData, setCourseMetaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCourseMetaData = async () => {
    try {
      setLoading(true);
      const Res = await fetch(
        `${
          getConfig().LMS_BASE_URL
        }/admin-console/api/course-metadata/${courseId}/`,
      );
      const Data = await Res.json();
      setCourseMetaData(Data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  useEffect(() => {
    getCourseMetaData();
  }, []);
  return {
    courseMetaData,
    loading,
  };
};
export default useGetCourseMetaData;
