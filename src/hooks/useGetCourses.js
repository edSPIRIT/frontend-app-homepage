import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useEffect, useState } from 'react';

const useGetCourses = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const getCourses = async () => {
    try {
      setLoading(true);
      const client = getAuthenticatedHttpClient();
      const baseUrl = getConfig().LMS_BASE_URL;
      const response = await client.get(`${baseUrl}/api/courses/v1/courses/`);
      setCourses(response.data.results);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);
  return {
    courses,
    loading,
  };
};
export default useGetCourses;
