import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetSubjects = () => {
  const [SubjectsData, setSubjectsData] = useState({});
  const getSubjectData = async () => {
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
    getSubjectData();
  }, []);
  return {
    subjects: SubjectsData?.items,
    coursesCounter: SubjectsData?.course_counter,
    popularSubjects: SubjectsData.items?.filter((item) => item.popular),
  };
};
export default useGetSubjects;
