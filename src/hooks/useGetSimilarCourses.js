import { getConfig } from '@edx/frontend-platform';

import { useEffect, useState } from 'react';
import { sendTrackingLogEvent } from '@edx/frontend-platform/analytics';

const useGetSimilarCourses = () => {
  const [TokenData, setTokenData] = useState('');
  const [similarCourses, setSimilarCourses] = useState([]);
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
    // const newToken = TokenData.csrfToken;
    // const expires = new Date(Date.now() + 86400 * 1000).toUTCString();
    // document.cookie = `csrftoken=${newToken}`;
    // document.cookie = `csrftoken=${newToken};expires=${expires};domain=local.overhang.io;path=/`;
    // ';domain=local.overhang.io;path=/';
    // const requestConfig = {
    //   headers: {
    //     'x-csrftoken': newToken,
    //   },
    // };
    // const requestUrl = `${getConfig().LMS_BASE_URL}/search/course_discovery/`;

    try {
      // const { data } = await getHttpClient().post(
      //   requestUrl,
      //   { search_string: 'course' },
      //   requestConfig
      // );
      // console.log('data', data);
      // getHttpClient().post(
      //   requestUrl,
      //   { search_string: 'course' },
      //   requestConfig
      // );
      // sendTrackingLogEvent('edx.profile.viewed');
      // document.cookie = `csrftoken=${newToken};domain=local.overhang.io;path=/`;
      document.cookie = `csrftoken=${TokenData.csrfToken};domain=${getConfig().LMS_BASE_URL};path=/`;
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
            search_string: 'course',
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
  }, [TokenData.csrfToken]);

  return {
    token: TokenData.csrfToken,
  };
};
export default useGetSimilarCourses;
