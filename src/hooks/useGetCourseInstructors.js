import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetCourseInstructors = () => {
  const [loading, setLoading] = useState(false);
  const [coursesInstructors, setCoursesInstructors] = useState([]);
  const getCoursesInstructors = async () => {
    try {
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/admin-console/api/instructor-list/?page=1&course_id=course-v1%3Aavi%2Bcs103%2B2021_T1`,
      );
      const Data = await Res.json();
      setCoursesInstructors(Data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    getCoursesInstructors();
  }, []);
  return {
    coursesInstructors,
    loading,
  };
};

export default useGetCourseInstructors;
