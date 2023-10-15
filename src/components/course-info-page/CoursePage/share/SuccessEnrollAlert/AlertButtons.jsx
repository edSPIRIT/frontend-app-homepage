/* eslint-disable react/prop-types */
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { ActionRow, Button } from '@edx/paragon';
import React from 'react';

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
    <Button
      variant="success"
      href={`${getConfig().LEARNING_BASE_URL}/course/${courseMetaData?.course_id
      }/home`}
      target="_blank"
      rel="noreferrer"
      onClick={closeAlert}
      disabled={isCourseNotStarted || hasPreReqCourse}
    >
      <FormattedMessage
        id="userCourseCard.goToYourCourse.button"
        defaultMessage="Go To Your Course"
      />
    </Button>
  </ActionRow>
);

export default AlertButtons;
