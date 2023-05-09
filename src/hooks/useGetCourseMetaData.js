/* eslint-disable consistent-return */
import { getConfig } from '@edx/frontend-platform';
// import axios from 'axios';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';

const useGetCourseMetaData = (courseId) => {
  const history = useHistory();

  const fetchCourseMetaData = async ({ queryKey }) => {
    const id = queryKey[1];
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/course-metadata/${id}/`,
      // {
      //   method: 'GET',
      //   cache: 'no-store',
      // },
    );
    if (apiRes.status === 404) {
      history.push('/404');
    }
    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  // const fetchCourseMetaData = async ({ queryKey }) => {
  //   const id = queryKey[1];
  //   try {
  //     const apiRes = await axios.get(
  //       `${getConfig().LMS_BASE_URL}/admin-console/api/course-metadata/${id}/`,
  //       // {
  //       //   headers: {
  //       //     'Cache-Control': 'no-cache',
  //       //     Pragma: 'no-cache',
  //       //     Expires: '0',
  //       //   },
  //       // },
  //     );
  //     return apiRes.data;
  //   } catch (err) {
  //     console.error(err);
  //     if (err.response.status === 404) {
  //       history.push('/404');
  //     }
  //   }
  // };
  const { data, isLoading } = useQuery(
    ['CourseMetaData', courseId],
    fetchCourseMetaData,
    {
      enabled: !!courseId,
      staleTime: 2 * (60 * 1000),
    },
  );

  return {
    courseMetaData: data,
    loading: isLoading,
  };
};
export default useGetCourseMetaData;
