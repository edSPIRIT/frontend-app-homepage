import { getConfig } from '@edx/frontend-platform';
import { useMediaQuery } from '@edx/paragon';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useGetSubjects = () => {
  const [popularSubjects, setPopularSubject] = useState();
  const isMobile = useMediaQuery({ maxWidth: '1024px' });

  const fetchSubjects = async () => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/subject-list/`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery('Subjects', fetchSubjects);
  useEffect(() => {
    if (data?.items) {
      const popSubjects = data?.items?.filter((item) => item.popular);
      if (isMobile) {
        switch (true) {
          case popSubjects.length < 4:
            setPopularSubject([]);
            break;
          case popSubjects.length > 6:
            setPopularSubject(popSubjects.slice(0, 6));
            break;
          default:
            setPopularSubject(popSubjects);
            break;
        }
      } else {
        switch (true) {
          case popSubjects.length >= 10:
            setPopularSubject(popSubjects.slice(0, 10));
            break;
          case popSubjects.length < 10 && popSubjects.length >= 5:
            setPopularSubject(popSubjects.slice(0, 5));
            break;
          default:
            setPopularSubject([]);
            break;
        }
      }
    }
  }, [data?.items, isMobile]);
  return {
    subjects: data?.items,
    coursesCounter: data?.course_counter,
    popularSubjects,
    loading: isLoading,
  };
};
export default useGetSubjects;
