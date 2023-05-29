/* eslint-disable consistent-return */
import { getConfig } from '@edx/frontend-platform';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useGetInstructors = (searchString) => {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(
    searchString,
  );
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchValue(searchString);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchString]);
  const fetchInstructors = async (query) => {
    try {
      const apiRes = await axios.get(
        `${
          getConfig().LMS_BASE_URL
        }/admin-console/api/instructor-list/?search_query=${query}`,
      );
      return apiRes.data;
    } catch (err) {
      console.error(err);
    }
  };
  const { data, isLoading } = useQuery(
    ['Instructors', debouncedSearchValue],
    () => fetchInstructors(debouncedSearchValue),
  );

  return {
    InstructorsData: data?.results,
    loading: isLoading,
  };
};
export default useGetInstructors;
