import { getConfig } from '@edx/frontend-platform';

import { useEffect, useState } from 'react';
import useGetCourses from './useGetCourses';

const useGetSimilarCoursesNew = () => {
  const [TokenData, setTokenData] = useState('');
  const [similarCourses, setSimilarCourses] = useState([]);
  const { coursesTitles } = useGetCourses();

  console.log('getConfig().LMS_BASE_URL', getConfig().LMS_BASE_URL);
  const getTokenData = async () => {
    try {
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}${getConfig().CSRF_TOKEN_API_PATH}`,
      );
      const Data = await Res.json();
      setTokenData(Data);
    } catch (e) {
      console.error(e);
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
            search_string: coursesTitles,
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
    if (TokenData.csrfToken) {
      getSimilarCoursesData();
    }
  }, [TokenData.csrfToken, coursesTitles]);

  return {
    token: TokenData.csrfToken,
    similarCourses,
  };
};
export default useGetSimilarCoursesNew;
