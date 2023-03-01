import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetCourseInstructors = (courseId) => {
  const [loading, setLoading] = useState(false);
  const [coursesInstructors, setCoursesInstructors] = useState([]);
  const getCoursesInstructors = async () => {
    try {
      const Res = await fetch(
        `${
          getConfig().LMS_BASE_URL
        }/admin-console/api/instructor-list/?page=1&course_id=${encodeURI(courseId)}`,
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
    if (courseId) {
      getCoursesInstructors();
    }
  }, [courseId]);
  return {
    coursesInstructors,
    loading,
  };
};

export default useGetCourseInstructors;
