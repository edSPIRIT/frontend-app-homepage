/* eslint-disable consistent-return */
import { getConfig } from '@edx/frontend-platform';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';

const useGetCourseMetaData = (courseId) => {
  const history = useHistory();

  const fetchCourseMetaData = async ({ queryKey }) => {
    const id = queryKey[1];
    try {
      const apiRes = await axios.get(
        `${getConfig().LMS_BASE_URL}/admin-console/api/course-metadata/${id}/`,
      );
      return apiRes.data;
    } catch (err) {
      console.error(err);
      if (err.response.status === 404) {
        history.push('/404');
      }
    }
  };
  const { data, isLoading } = useQuery(
    ['CourseMetaData', courseId],
    fetchCourseMetaData,
    {
      enabled: !!courseId,
    },
  );

  return {
    courseMetaData: data,
    loading: isLoading,
  };
};
export default useGetCourseMetaData;
