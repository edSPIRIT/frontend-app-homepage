/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';

const useUserCourseButtonStatus = (courseInfo) => {
  const [status, setStatus] = useState({});

  useEffect(() => {
    if (courseInfo) {
      const currentDate = new Date();
      const courseStartDate = courseInfo?.course_details?.course_start
        ? new Date(courseInfo?.course_details?.course_start)
        : null;
      const isCourseNotStarted = courseStartDate && currentDate < courseStartDate;
      setStatus({
        isCourseNotStarted,
        hasPreReqCourse: courseInfo?.has_pre_req_courses,
      });
    }
  }, [courseInfo]);

  return status;
};

export default useUserCourseButtonStatus;
