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
  const { data, isLoading } = useQuery({
    queryKey: ['SimilarCourses'],
    queryFn: fetchSimilarCourses,
    enabled: !!searchQuery,
  });
  // const getSimilarCoursesData = async () => {
  //   try {
  //     const Res = await fetch(
  //       `${getConfig().LMS_BASE_URL}/admin-console/api/full-course-discovery/`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },

  //         body: JSON.stringify({
  //           search_string: searchQuery,
  //         }),
  //       },
  //     );
  //     const Data = await Res.json();
  //     setSimilarCourses(Data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   if (searchQuery) {
  //     getSimilarCoursesData();
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchQuery]);
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
