/* eslint-disable no-restricted-syntax */
import { getConfig } from '@edx/frontend-platform';
import { useMediaQuery } from '@edx/paragon';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useGetFeaturedSubjects = () => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const [featuredSubjects, setFeaturedSubjects] = useState();

  const fetchFeaturedSubjects = async () => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/subject-list/?featured=true&page_size=10`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };

  const { data, isLoading } = useQuery(
    'featuredSubjects',
    fetchFeaturedSubjects,
  );
  useEffect(() => {
    if (data) {
      const getFeaturedSubjects = (min, max) => {
        if (data?.count < min) {
          console.log('featuredSubjects min', data?.results.slice(0, min), min, data?.course_counter);

          return [];
        }
        if (data?.count >= max) {
          console.log('featuredSubjects max', data?.results.slice(0, max), max, data?.course_counter);

          return data?.results.slice(0, max);
        }
        return data?.results.slice(0, min);
      };
      const FeaturedSubjectsToShow = isMobile
        ? getFeaturedSubjects(3, 6)
        : getFeaturedSubjects(5, 10);

      setFeaturedSubjects(FeaturedSubjectsToShow);
    }
  }, [data, isMobile]);

  return {
    featuredSubjects,
    loading: isLoading,
  };
};
export default useGetFeaturedSubjects;
