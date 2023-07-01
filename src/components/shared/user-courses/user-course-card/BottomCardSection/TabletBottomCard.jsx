/* eslint-disable react/prop-types */
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button, Icon, ProgressBar } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import React from 'react';

const TabletBottomCard = ({
  courseCompleted,
  calcProgress,
  certificateData,
}) => (
  <div className="d-flex flex-column">
    {courseCompleted ? (
      <div className="d-flex align-items-center ">
        <Icon className="check-circle-icon mr-2.5" src={CheckCircle} />
        <span className="second-title">
          <FormattedMessage
            id="userCourseCard.completed.text"
            defaultMessage="Well done! You completed this course"
          />
        </span>
      </div>
    ) : (
      <ProgressBar now={calcProgress()} label={`${calcProgress()}%`} />
    )}
    { certificateData && (
    <Button
      className="view-course-btn"
      onClick={(e) => {
        e.preventDefault();
        window.location.href = `${getConfig().LMS_BASE_URL}${
          certificateData?.download_url
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
