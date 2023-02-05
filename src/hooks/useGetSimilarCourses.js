import { getConfig } from '@edx/frontend-platform';
import {
  getAuthenticatedHttpClient,
  getHttpClient,
  getCsrfTokenService,
  getCsrfToken,
} from '@edx/frontend-platform/auth';
import { useEffect, useState } from 'react';
import { sendTrackingLogEvent } from '@edx/frontend-platform/analytics';

const useGetSimilarCourses = () => {
  const [TokenData, setTokenData] = useState('');
  const [similarCourses, setSimilarCourses] = useState([]);
  let cookies = document.cookie;
  // console.log('cookies', getCsrfToken());
  // console.log('document.cookie', document.cookie);
  const getTokenData = async () => {
    try {
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}${getConfig().CSRF_TOKEN_API_PATH}`
      );
      const Data = await Res.json();
      setTokenData(Data);
    } catch (e) {
      console.error(e);
    }
  };
  const getSimilarCoursesData = async () => {
    const requestConfig = {
      headers: {
        'x-csrftoken': `${TokenData.csrfToken}`,
      },
    };
    const requestUrl = `${getConfig().LMS_BASE_URL}/search/course_discovery/`;

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
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/search/course_discovery/`,
        {
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json',
            'x-csrftoken': `${TokenData.csrfToken}`,
            // Cookie:
            //   'csrftoken=iXhAwECMD4tEusA8shK619JbU4cm7V89KF7Tus2iObAO5ZoUNC4k0uVGuYCKC9HW',
          },
          credentials: 'include',
          body: JSON.stringify({
            search_string: 'course',
          }),
        }
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
    getSimilarCoursesData();
  }, [TokenData.csrfToken]);

  return {
    token: TokenData.csrfToken,
  };
};
export default useGetSimilarCourses;
