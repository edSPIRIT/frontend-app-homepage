/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Icon, ProgressBar } from '@edx/paragon';
import { CheckCircle, Warning } from '@edx/paragon/icons';
import React from 'react';

const ProgressStatus = ({ courseCompleted, calcProgress, isCourseNotStarted }) => {
  if (courseCompleted) {
    return (
      <div className="d-flex align-items-center ">
        <Icon className="check-circle-icon mr-2.5" src={CheckCircle} />
        <span className="second-title">
          <FormattedMessage
            id="userCourseCard.completed.text"
            defaultMessage="Well done! You completed this course"
          />
        </span>
      </div>
    );
  }
  if (isCourseNotStarted) {
    return (
      <div className="d-flex align-items-start">
        <Icon className="mr-1 warning-icon" src={Warning} />
        <span className="font-sm">
          <FormattedMessage
            id="courseInfo.starCourseDate.attention"
            defaultMessage="Course coming soon! Stay tuned for the start date"
          />
        </span>
      </div>
    );
  }
  return <ProgressBar now={calcProgress()} label={`${calcProgress()}%`} />;
};

export default ProgressStatus;