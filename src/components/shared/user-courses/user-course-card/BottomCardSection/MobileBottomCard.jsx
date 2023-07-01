/* eslint-disable react/prop-types */
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button, Icon, ProgressBar } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import React from 'react';

const MobileBottomCard = ({
  courseCompleted,
  calcProgress,
  certificateData,
  courseInfo,
}) => {
  const buttonStatus = () => {
    if (certificateData) {
      return (
        <Button
          className="view-course-btn mr-2"
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
      );
    }

    return (
      <Button
        className="view-course-btn"
        variant="primary"
        href={`https://apps.${getConfig().LMS_BASE_URL.replace(
          'https://',
          '',
        )}/learning/course/${courseInfo?.course_details?.course_id}/home`}
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
  };

  return (
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
      {buttonStatus()}
    </div>
  );
};

export default MobileBottomCard;
