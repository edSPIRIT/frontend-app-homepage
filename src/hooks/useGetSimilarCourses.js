import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useGetSimilarCourses = (searchQuery, courseIds) => {
  const [filterSimilarCourses, setFilterSimilarCourses] = useState([]);
  const fetchSimilarCourses = async () => {
    const url = `${
      getConfig().LMS_BASE_URL
    }/admin-console/api/full-course-discovery/`;
    const { data } = await getAuthenticatedHttpClient().post(url, {
      search_string: searchQuery,
    });
    return data;
  };
  const { data, isLoading } = useQuery(
    ['SimilarCourses', searchQuery],
    fetchSimilarCourses,
    {
      enabled: searchQuery !== 'undefined',
    },
  );
  useEffect(() => {
    if (courseIds && data) {
      const filteredCourses = data?.results?.filter(
        (course) => !courseIds?.includes(course?.data?.id),
      );
      setFilterSimilarCourses(filteredCourses);
    }
  }, [data, courseIds]);

  return {
    similarCourses: filterSimilarCourses,
    loading: isLoading,
  };
};
export default useGetSimilarCourses;
