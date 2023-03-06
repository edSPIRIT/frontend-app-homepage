import { getConfig } from '@edx/frontend-platform';

import { useEffect, useState } from 'react';

const useGetSimilarCourses = (searchQuery) => {
  const [TokenData, setTokenData] = useState('');
  const [similarCourses, setSimilarCourses] = useState([]);
  const [loading, setLoading] = useState(false);

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
      document.cookie = `csrftoken=${
        TokenData.csrfToken
      };domain=${getConfig().LMS_BASE_URL.replace('https://', '')};path=/`;
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/search/course_discovery/`,
        {
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json',
            'x-csrftoken': TokenData.csrfToken,
          },
          credentials: 'include',
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

  useEffect(() => {
    getTokenData();
  }, []);
  useEffect(() => {
    if (TokenData.csrfToken && searchQuery) {
      getSimilarCoursesData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TokenData.csrfToken, searchQuery]);

  return {
    similarCourses: similarCourses.results,
    loading,
  };
};
export default useGetSimilarCourses;
