/* eslint-disable react/prop-types */
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';
import React from 'react';

const GoResumeCourseButton = ({
  courseInfo,
  isCourseNotStarted,
  calcProgress,
  preReqCourse,
}) => (
  <Button
    className="view-btn view-course-btn"
    variant="primary"
    href={`${getConfig().LEARNING_BASE_URL}/course/${
      courseInfo?.course_details?.course_id
    }/home`}
    disabled={isCourseNotStarted || preReqCourse}
  >
    {calcProgress() > 0 ? (
      <span>
        <FormattedMessage
          id="userCourseCard.resumeCourse.text"
          defaultMessage="Resume Course"
        />
      </span>
    ) : (
      <span>
        <FormattedMessage
          id="userCourseCard.goToYourCourse.button"
          defaultMessage="Go To Your Course"
        />
      </span>
    )}
  </Button>
);

export default GoResumeCourseButton;
