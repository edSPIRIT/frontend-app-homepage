import { getConfig } from '@edx/frontend-platform';
import { useMediaQuery } from '@edx/paragon';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useGetPopularSubjects = () => {
  const [popularSubjects, setPopularSubject] = useState();
  const isMobile = useMediaQuery({ maxWidth: '1024px' });

  const fetchSubjects = async () => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/popular-subject-list/`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery('Subjects', fetchSubjects);
  useEffect(() => {
    if (data?.results) {
      if (isMobile) {
        switch (true) {
          case data.results.length < 4:
            setPopularSubject([]);
            break;
          case data.results.length > 6:
            setPopularSubject(data.results.slice(0, 6));
            break;
          default:
            setPopularSubject(data.results);
            break;
        }
      } else {
        switch (true) {
          case data.results.length >= 10:
            setPopularSubject(data.results.slice(0, 10));
            break;
          case data.results.length < 10 && data.results.length >= 5:
            setPopularSubject(data.results.slice(0, 5));
            break;
          default:
            setPopularSubject([]);
            break;
        }
      }
    }
  }, [data?.results, isMobile]);
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
