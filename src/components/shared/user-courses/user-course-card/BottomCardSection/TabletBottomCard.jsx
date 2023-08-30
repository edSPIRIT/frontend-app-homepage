/* eslint-disable react/prop-types */
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';
import React from 'react';
import ProgressStatus from '../../share/ProgressStatus';

const TabletBottomCard = ({
  courseCompleted,
  calcProgress,
  certificateData,
  isCourseNotStarted,
  hasPreReqCourse,
}) => (
  <div className="d-flex flex-column">
    <ProgressStatus
      courseCompleted={courseCompleted}
      calcProgress={calcProgress}
      isCourseNotStarted={isCourseNotStarted}
      hasPreReqCourse={hasPreReqCourse}
    />
    {certificateData && (
      <Button
        className="view-course-btn"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `${getConfig().LMS_BASE_URL}${certificateData?.download_url
          }`;
        }}
      >
        <FormattedMessage
          id="userCourseCard.viewCertificate.text"
          defaultMessage="View Certificate"
        />
      </Button>
    )}
  </div>
);

export default TabletBottomCard;
