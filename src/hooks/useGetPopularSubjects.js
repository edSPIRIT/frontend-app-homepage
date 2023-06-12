import { getConfig } from '@edx/frontend-platform';
import { useMediaQuery } from '@edx/paragon';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useGetPopularSubjects = () => {
  const [popularSubjects, setPopularSubject] = useState();
  const isMobile = useMediaQuery({ maxWidth: '1024px' });

  const fetchSubjects = async () => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/subject-list/?featured=true`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery('Subjects', fetchSubjects);
  useEffect(() => {
    if (data?.items) {
      if (isMobile) {
        switch (true) {
          case data.items.length < 4:
            setPopularSubject([]);
            break;
          case data.items.length > 6:
            setPopularSubject(data.items.slice(0, 6));
            break;
          default:
            setPopularSubject(data.items);
            break;
        }
      } else {
        switch (true) {
          case data.items.length >= 10:
            setPopularSubject(data.items.slice(0, 10));
            break;
          case data.items.length < 10 && data.items.length >= 5:
            setPopularSubject(data.items.slice(0, 5));
            break;
          default:
            setPopularSubject([]);
            break;
        }
      }
    }
  }, [data?.items, isMobile]);
  // useEffect(() => {
  //   if (data?.items) {
  //     const popSubjects = data.items.filter((item) => item.popular);
  //     const getPopularSubjects = (min, max) => {
  //       if (popSubjects.length < min) {
  //         return [];
  //       } if (popSubjects.length > max) {
  //         return popSubjects.slice(0, max);
  //       }
  //       return popSubjects;
  //     };
  //     const popularSubjectsToShow = isMobile
  //       ? getPopularSubjects(4, 6)
  //       : getPopularSubjects(5, 10);

  //     setPopularSubject(popularSubjectsToShow);
  //   }
  // }, [data?.items, isMobile]);
  return {
    popularSubjects,
    loading: isLoading,
  };
};
export default useGetPopularSubjects;
