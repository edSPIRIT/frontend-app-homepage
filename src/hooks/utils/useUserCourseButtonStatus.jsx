/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import useCheckPrerequisiteStatus from '../useCheckPrerequisiteStatus';

const useUserCourseButtonStatus = (courseInfo) => {
  const [status, setStatus] = useState({});
  const { isCompletePreReq } = useCheckPrerequisiteStatus(
    courseInfo?.course_metadata?.slug,
  );
  useEffect(() => {
    if (courseInfo) {
      const currentDate = new Date();
      const courseStartDate = courseInfo?.course_details?.course_start
        ? new Date(courseInfo?.course_details?.course_start)
        : null;
      const isCourseNotStarted = courseStartDate && currentDate < courseStartDate;
      setStatus({
        isCourseNotStarted,
        // check whether user has completed the pre req course or not
        preReqCourse: courseInfo?.pre_req_courses
          ? isCompletePreReq === false
          : false,
      });
    }
  }, [courseInfo, isCompletePreReq]);

  return status;
};

export default useUserCourseButtonStatus;
