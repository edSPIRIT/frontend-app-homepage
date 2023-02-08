import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetSubjects = () => {
  const [subjectsData, setSubjectsData] = useState({});
  const [loading, setLoading] = useState(false);

  const getSubjectsData = async () => {
    try {
      setLoading(true);
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/admin-console/api/subject-list/`,
      );
      const Data = await Res.json();
      setSubjectsData(Data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  useEffect(() => {
    getSubjectsData();
  }, []);
  return {
    subjects: subjectsData?.items,
    coursesCounter: subjectsData?.course_counter,
    popularSubjects: subjectsData.items?.filter((item) => item.popular),
    loading,
  };
};
export default useGetSubjects;
