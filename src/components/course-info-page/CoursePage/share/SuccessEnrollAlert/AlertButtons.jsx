/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { ActionRow, Button } from '@edx/paragon';
import React from 'react';
import GoResumeCourseButton from '../../../../shared/user-courses/share/GoResumeCourseButton';

const AlertButtons = ({
  courseMetaData, closeAlert, isCourseNotStarted, hasPreReqCourse,
}) => (
  <ActionRow>
    <Button variant="tertiary" onClick={closeAlert}>
      <FormattedMessage
        id="courseInfo.startLater.button"
        defaultMessage="Start Later"
      />
    </Button>
    <GoResumeCourseButton
      courseId={courseMetaData?.course_id}
      isCourseNotStarted={isCourseNotStarted}
      hasPreReqCourse={hasPreReqCourse}
      variant="success"
    />
  </ActionRow>
);

export default AlertButtons;
