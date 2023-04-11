import { getConfig } from '@edx/frontend-platform';

import { useEffect, useState } from 'react';

const useGetSimilarCourses = (searchQuery, courseIds) => {
  const [TokenData, setTokenData] = useState('');
  const [similarCourses, setSimilarCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterSimilarCourses, setFilterSimilarCourses] = useState([]);

  const getTokenData = async () => {
    try {
      setLoading(true);
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}${getConfig().CSRF_TOKEN_API_PATH}`,
      );
      const Data = await Res.json();
      setTokenData(Data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  const getSimilarCoursesData = async () => {
    try {
      // document.cookie = `csrftoken=${
      //   TokenData.csrfToken
      // };domain=${getConfig().LMS_BASE_URL.replace('https://', '')};path=/`;
      const Res = await fetch(
        // `${getConfig().LMS_BASE_URL}/search/course_discovery/`,
        `${getConfig().LMS_BASE_URL}/admin-console/api/full-course-discovery/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'x-csrftoken': TokenData.csrfToken,
          },
          // credentials: 'include',
          body: JSON.stringify({
            search_string: searchQuery,
          }),
        },
      );
      const Data = await Res.json();
      setSimilarCourses(Data);
    } catch (e) {
      console.error(e);
    }
  };

  // useEffect(() => {
  //   getTokenData();
  // }, []);
  useEffect(() => {
    if (searchQuery) {
      getSimilarCoursesData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);
  useEffect(() => {
    if (searchQuery && courseIds && similarCourses?.results) {
      console.log('searchQuery & courseIds inuseeffect', searchQuery, courseIds, similarCourses?.results);
      const filteredCourses = similarCourses?.results?.filter(
        (course) => {
          console.log('courseIds in filter', course?.data?.id, !courseIds?.includes(course?.data?.id));
          return !courseIds?.includes(course?.data?.id);
        },
      );
      setFilterSimilarCourses(filteredCourses);
    }
  }, [searchQuery, courseIds, similarCourses?.results]);

  return {
    similarCourses: filterSimilarCourses,
    loading,
  };
};
export default useGetSimilarCourses;
