import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetSubjects = () => {
  const [subjectsData, setSubjectsData] = useState({});
  const getSubjectsData = async () => {
    try {
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/admin-console/api/subject-list/`,
      );
      const Data = await Res.json();
      setSubjectsData(Data);
    } catch (e) {
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
  };
};
export default useGetSubjects;
