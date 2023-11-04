import { getConfig } from '@edx/frontend-platform';
import axios from 'axios';
import { useQuery } from 'react-query';

const useGetPaidCourses = (courseMetaData) => {
  const fetchPaidCourses = async ({ queryKey }) => {
    const id = queryKey[1];
    try {
      const apiRes = await axios.get(
        `${getConfig().LMS_BASE_URL}/admin-console/api/paid-courses/${id}`,
      );
      return apiRes.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const { data, isLoading, error } = useQuery(
    ['PaidCourse', courseMetaData?.course_id],
    fetchPaidCourses,
    {
      enabled: courseMetaData?.paid_course?.active,
      onError: (e) => {
        console.error(e);
      },
    },
  );

  return {
    paidCourses: data,
    loading: isLoading,
    error,
  };
};
export default useGetPaidCourses;
