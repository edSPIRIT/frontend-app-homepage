/* eslint-disable react/prop-types */
/* eslint-disable object-curly-spacing */

import { Button, Spinner } from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';
import useEnrollClickHandler from '../../../hooks/useEnrollClickHandler';
import useGetEnrollmentList from '../../../hooks/useGetEnrollmentList';

const CourseInfoButtonStatus = ({ courseMetaData }) => {
  const { loading: coursesEnrollLoading, userCourseIds } = useGetEnrollmentList();
  const {
    enrollClickHandler,
    loading: enrollLoading,
    availablePaymentData,
  } = useEnrollClickHandler(courseMetaData?.course_id);
  if (coursesEnrollLoading || enrollLoading) {
    return (
      <Button variant="brand" href="#course" className="mb-3 enroll-btn">
        <Spinner animation="border" />
      </Button>
    );
  }
  if (userCourseIds?.includes(courseMetaData?.course_id)) {
    return (
      <Button
        variant="primary"
        className="enroll-btn"
        href={`https://apps.${getConfig().LMS_BASE_URL.replace(
          'https://',
          '',
        )}/learning/course/${courseMetaData?.course_id}/home`}
        target="_blank"
        rel="noreferrer"
      >
        Go to course
      </Button>
    );
  }
  return (
    <Button
      variant="brand"
      className="enroll-btn"
      onClick={enrollClickHandler}
      disabled={courseMetaData?.paid_course?.price > 0 && !availablePaymentData}
    >
      {courseMetaData?.paid_course?.price > 0 ? (
        <span>Purchase now</span>
      ) : (
        <span>Enroll now</span>
      )}
    </Button>
  );
};

export default CourseInfoButtonStatus;
