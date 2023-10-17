/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button, Spinner } from '@edx/paragon';
import React from 'react';
import useCourseOutline from '../../../../hooks/useCourseOutline';

const GoResumeCourseButton = ({
  courseId,
  isCourseNotStarted,
  hasPreReqCourse,
  variant = 'primary',
}) => {
  const { resumeCourseUrl, hasVisitedCourse, loading } = useCourseOutline(courseId);

  return (
    <Button
      className="view-btn view-course-btn enroll-btn"
      variant={variant}
      href={resumeCourseUrl}
      disabled={isCourseNotStarted || hasPreReqCourse}
    >
      {loading ? (
        <Spinner animation="border" />
      ) : hasVisitedCourse ? (
        <FormattedMessage
          id="userCourseCard.resumeCourse.text"
          defaultMessage="Resume Course"
        />
      ) : (
        <FormattedMessage
          id="userCourseCard.goToYourCourse.button"
          defaultMessage="Go To Your Course"
        />
      )}
    </Button>
  );
};

export default GoResumeCourseButton;
