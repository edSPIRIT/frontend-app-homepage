import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const useGetEnrollmentList = () => {
  const [loading, setLoading] = useState(false);
  const [coursesEnrollment, setCoursesEnrollment] = useState([]);
  const getCoursesEnrollment = async () => {
    try {
      setLoading(true);
      const { data } = await getAuthenticatedHttpClient().get(`${
        getConfig().LMS_BASE_URL
      }/admin-console/api/openedx/api/enrollment-list/`);
      console.log('data', data);
      setCoursesEnrollment(data);

      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    getCoursesEnrollment();
  }, []);

  return {
    coursesEnrollment,
    loading,
  };
};

export default useGetEnrollmentList;
