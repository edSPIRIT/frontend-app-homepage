import { getConfig } from '@edx/frontend-platform';
import { useMediaQuery } from '@edx/paragon';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

const useGetSubjects = () => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const [arrangedSubjects, setArrangedSubjects] = useState();

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
      const getArrangedSubjects = (min, max) => {
        if (data.items.length < min) {
          return [];
        } if (data.items.length > max) {
          return data.items.slice(0, max);
        }
        return data.items;
      };
      const arrangedSubjectsToShow = isMobile
        ? getArrangedSubjects(0, 6)
        : getArrangedSubjects(5, 10);

      setArrangedSubjects(arrangedSubjectsToShow);
    }
  }, [data?.items, isMobile]);
  return {
    subjects: data?.items,
    arrangedSubjects,
    coursesCounter: data?.course_counter,
    loading: isLoading,
  };
};
export default useGetSubjects;
