import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useGetSubjectsFacet = (searchString) => {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchString);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchValue(searchString);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchString]);
  const fetchSubjectsFacet = async (query) => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/subject-list/?has-courses-count=true&title=${query}`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery(
    ['SubjectsFacet', debouncedSearchValue],
    () => fetchSubjectsFacet(debouncedSearchValue),
  );

  return {
    subjects: data?.items,
    coursesCounter: data?.course_counter,
    loading: isLoading,
  };
};
export default useGetSubjectsFacet;
